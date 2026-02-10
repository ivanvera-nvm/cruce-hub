import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const allowedEmailDomain = (process.env.ALLOWED_EMAIL_DOMAIN || "e-cruce")
	.trim()
	.toLowerCase();

if (!googleClientId || !googleClientSecret) {
	throw new Error(
		"Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET for Better Auth Google provider.",
	);
}

function isAllowedCompanyEmail(email: string | null | undefined): boolean {
	if (!email) {
		return false;
	}

	return email.toLowerCase().endsWith(`@${allowedEmailDomain}`);
}

export const auth = betterAuth({
	socialProviders: {
		google: {
			clientId: googleClientId,
			clientSecret: googleClientSecret,
			hd: allowedEmailDomain,
			disableSignUp: false,
		},
	},
	databaseHooks: {
		user: {
			create: {
				async before(user) {
					if (!isAllowedCompanyEmail(user.email)) {
						return false;
					}
				},
			},
		},
		session: {
			create: {
				async before(session, context) {
					if (!context) {
						return false;
					}

					const user = await context.context.internalAdapter.findUserById(
						session.userId,
					);

					if (!isAllowedCompanyEmail(user?.email)) {
						return false;
					}
				},
			},
		},
	},
	plugins: [tanstackStartCookies()],
});
