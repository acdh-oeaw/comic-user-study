declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BOTS?: string | undefined;
			NEXT_PUBLIC_APP_BASE_URL?: string | undefined;
			NEXT_PUBLIC_MATOMO_BASE_URL?: string | undefined;
			NEXT_PUBLIC_MATOMO_ID?: string | undefined;
			NEXT_PUBLIC_REDMINE_ID?: string | undefined;
			GITHUB_REPOSITORY?: string | undefined;
			GITHUB_ACTIONS?: boolean | undefined;
		}
	}
}

export {};
