const { PUBLIC_BASE_URL, PUBLIC_CRYPTO_PRIVATE_KEY, logo }: any = globalThis
console.log(34543543, globalThis);

export const envConfig = {
	PUBLIC_BASE_URL:
		PUBLIC_BASE_URL || import.meta.env.PUBLIC_BASE_URL,
			PUBLIC_CRYPTO_PRIVATE_KEY:
	PUBLIC_CRYPTO_PRIVATE_KEY ||
		import.meta.env.PUBLIC_CRYPTO_PRIVATE_KEY
}