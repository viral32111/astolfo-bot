// Runtime
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

// Third-party
import javascript from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import prettier from "eslint-plugin-prettier/recommended"
import globals from "globals"
import typescript from "typescript-eslint"

// https://typescript-eslint.io/packages/typescript-eslint#config
export default typescript.config({
	// Based upon third-party configurations
	extends: [javascript.configs.recommended, typescript.configs.strictTypeChecked, typescript.configs.stylisticTypeChecked, stylistic.configs.all, prettier],

	// Load third-party plugins
	plugins: {
		"@typescript-eslint": typescript.plugin, // https://typescript-eslint.io/getting-started/
		"@stylistic": stylistic // https://eslint.style/guide/getting-started
	},

	languageOptions: {
		// Include browser globals (i.e., window., console., etc.) - https://eslint.org/docs/latest/use/configure/language-options#predefined-global-variables
		globals: globals.browser,

		// TypeScript - https://typescript-eslint.io/getting-started/typed-linting/
		parserOptions: {
			project: "tsconfig.json",
			tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),

			// These belong here instead of under languageOptions when using the TypeScript parser - https://github.com/eslint/eslint/issues/17771#issuecomment-1817139999
			ecmaVersion: "latest", // Always use the latest standard
			sourceType: "module",

			// This project uses beta packages, so we don't care about this warning! - https://typescript-eslint.io/packages/parser#warnonunsupportedtypescriptversion
			warnOnUnsupportedTypeScriptVersion: false,

			// Force strict mode - https://eslint.org/docs/latest/use/configure/language-options#specifying-parser-options
			ecmaFeatures: {
				impliedStrict: true,
				globalReturn: false // No entry point for Web Browsers
			}
		}
	},

	// Allow inline overrides but warn if they are unnecessary - https://eslint.org/docs/latest/use/configure/configuration-files#configuring-linter-options
	linterOptions: {
		noInlineConfig: false,
		reportUnusedDisableDirectives: "warn"
	},

	rules: {
		// Vanilla JavaScript - https://eslint.org/docs/latest/rules/
		...{
			"strict": "warn",

			// Prevent common accidents
			"array-callback-return": [
				"warn",
				{
					allowImplicit: false,
					checkForEach: true,
					allowVoid: false
				}
			],
			"no-control-regex": "warn",
			"no-invalid-regexp": "error",
			"no-loss-of-precision": "warn",
			"no-prototype-builtins": "warn",
			"no-unsafe-negation": [
				"warn",
				{
					enforceForOrderingRelations: true
				}
			],
			"no-unsafe-optional-chaining": [
				"warn",
				{
					disallowArithmeticOperators: true
				}
			],
			"use-isnan": [
				"warn",
				{
					enforceForIndexOf: true,
					enforceForSwitchCase: true
				}
			],
			"valid-typeof": [
				"warn",
				{
					requireStringLiterals: true
				}
			],
			"consistent-return": [
				"warn",
				{
					treatUndefinedAsUnspecified: false
				}
			],
			"default-case": "off",
			"default-param-last": "warn",
			"eqeqeq": ["warn", "always"],
			"guard-for-in": "warn",
			"no-div-regex": "warn",
			"no-eq-null": "warn",
			"no-octal": "warn",

			// Prevent unnecessary code
			"no-compare-neg-zero": "warn",
			"no-cond-assign": ["warn", "always"],
			"no-constant-binary-expression": "warn",
			"no-dupe-else-if": "warn",
			"no-duplicate-case": "warn",
			"no-duplicate-imports": [
				"warn",
				{
					includeExports: true
				}
			],
			"no-empty-character-class": "warn",
			"no-empty-pattern": [
				"warn",
				{
					allowObjectPatternsAsParameters: false
				}
			],
			"no-self-compare": "warn",
			"no-template-curly-in-string": "warn",
			"no-unreachable": "warn",
			"no-unused-private-class-members": "warn",
			"no-unused-vars": "off", // Seems to be broken?
			"no-useless-backreference": "warn",
			"no-else-return": [
				"warn",
				{
					allowElseIf: false
				}
			],
			"no-empty": [
				"warn",
				{
					allowEmptyCatch: false
				}
			],
			"no-empty-function": "off", // Conflicts with @typescript-eslint/no-empty-function
			"no-empty-static-block": "warn",
			"no-extra-bind": "warn",
			"no-extra-boolean-cast": [
				"warn",
				{
					enforceForLogicalOperands: true
				}
			],
			"no-extra-label": "warn",
			"no-lone-blocks": "warn",
			"no-lonely-if": "warn",
			"no-new": "warn",

			// Prevent async/await mistakes
			"no-async-promise-executor": "warn",
			"no-await-in-loop": "warn",
			"no-promise-executor-return": [
				"error",
				{
					allowVoid: false
				}
			],
			"require-atomic-updates": [
				"warn",
				{
					allowProperties: false
				}
			],
			"prefer-spread": "warn",
			"prefer-object-spread": "warn",
			"prefer-template": "warn",
			"prefer-object-has-own": "warn",
			"prefer-const": "warn",
			"prefer-named-capture-group": "warn",
			"no-return-assign": "warn",
			"radix": "warn",

			// Prevent flow control mistakes
			"for-direction": "warn",
			"no-fallthrough": "warn",
			"no-unmodified-loop-condition": "warn",
			"no-unreachable-loop": "warn",
			"no-unsafe-finally": "warn",
			"no-case-declarations": "warn",
			"no-labels": "error",

			// Prevent legacy code
			"no-inner-declarations": ["error", "both"],
			"no-unexpected-multiline": "error",
			"block-scoped-var": "error",
			"no-caller": "error",
			"no-iterator": "error",
			"no-nonoctal-decimal-escape": "error",
			"no-octal-escape": "error",
			"no-var": "warn",

			// Prevent security vulnerabilities
			"no-eval": "error",
			"no-implied-eval": "error",
			"no-new-func": "error",

			// Prevent object/class mistakes
			"constructor-super": "warn",
			"no-this-before-super": "warn",
			"getter-return": [
				"warn",
				{
					allowImplicit: false
				}
			],
			"no-setter-return": "warn",
			"no-constructor-return": "error",
			"no-new-native-nonconstructor": "error",
			"no-obj-calls": "error",
			"accessor-pairs": [
				"warn",
				{
					setWithoutGet: true,
					getWithoutSet: true,
					enforceForClassMembers: true
				}
			],
			"class-methods-use-this": [
				"warn",
				{
					enforceForClassFields: true
				}
			],

			// Ensure immutability
			"no-class-assign": "error",
			"no-const-assign": "error",
			"no-dupe-args": "error",
			"no-dupe-class-members": "error",
			"no-dupe-keys": "error",
			"no-ex-assign": "error",
			"no-func-assign": "error",
			"no-import-assign": "error",
			"no-self-assign": "error",
			"no-undef": "off", // Conflicts with TypeScript - https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			"no-use-before-define": [
				"warn",
				{
					variables: true,
					functions: true,
					classes: true,
					allowNamedExports: false
				}
			],
			"init-declarations": ["warn", "always"],
			"no-delete-var": "error",
			"no-extend-native": "error",
			"no-global-assign": "error",
			"no-invalid-this": [
				"error",
				{
					capIsConstructor: false
				}
			],
			"no-label-var": "error",
			"no-loop-func": "error",

			// Aid debugging
			"func-names": ["warn", "always"],

			// Bad practices
			"no-debugger": "warn",
			"no-alert": "warn",
			"no-console": "off",

			// Prevent bad characters from copy-pasting
			"no-irregular-whitespace": [
				"warn",
				{
					skipStrings: false,
					skipComments: false,
					skipRegExps: false,
					skipTemplates: false,
					skipJSXText: false
				}
			],
			"no-misleading-character-class": "warn",

			// Improve readability & consistency
			"no-sparse-arrays": "warn",
			"arrow-body-style": ["warn", "as-needed"],
			"camelcase": [
				"off",
				{
					properties: "always",
					ignoreDestructuring: false,
					ignoreImports: false,
					ignoreGlobals: false
				}
			],
			"consistent-this": ["warn", "that"],
			"default-case-last": "warn",
			"dot-notation": [
				"warn",
				{
					allowKeywords: false
				}
			],
			"func-name-matching": [
				"warn",
				"always",
				{
					considerPropertyDescriptor: true,
					includeCommonJSModuleExports: true
				}
			],
			"func-style": [
				"warn",
				"expression",
				{
					allowArrowFunctions: true
				}
			],
			"grouped-accessor-pairs": ["warn", "getBeforeSet"],
			"logical-assignment-operators": [
				"warn",
				"always",
				{
					enforceForIfStatements: true
				}
			],
			"new-cap": [
				"warn",
				{
					newIsCap: true,
					capIsNew: true,
					properties: true
				}
			],
			"no-array-constructor": "warn",
			"no-implicit-coercion": [
				"warn",
				{
					boolean: true,
					number: true,
					string: true,
					disallowTemplateShorthand: true
				}
			],
			"no-implicit-globals": [
				"warn",
				{
					lexicalBindings: true
				}
			],
			"no-multi-assign": [
				"warn",
				{
					ignoreNonDeclaration: false
				}
			],
			"no-new-wrappers": "warn",
			"no-object-constructor": "warn",
			"linebreak-style": ["warn", "unix"], // Required for CI/CD

			// Disable silly rules
			"complexity": "off",
			"id-denylist": "off",
			"id-length": "off",
			"id-match": "off",
			"max-classes-per-file": "off",
			"max-depth": "off",
			"max-lines-per-function": "off",
			"max-nested-callbacks": "off",
			"max-params": "off",
			"max-statements": "off",
			"no-bitwise": "off",
			"no-continue": "off",
			"no-inline-comments": "off",
			"no-multi-str": "off",
			"capitalized-comments": "off",
			"multiline-comment-style": "off",
			"no-negated-condition": "off",
			"no-param-reassign": "off",
			"no-magic-numbers": "off",
			"max-lines": "off",
			"no-nested-ternary": "off",
			"curly": "off"

			// TODO: no-plusplus and onwards - https://eslint.org/docs/v8.x/rules/
		},

		// TypeScript - https://typescript-eslint.io/rules/
		...{
			// These are from the original compatibility (ESLint 8) config
			"@typescript-eslint/adjacent-overload-signatures": "warn",
			"@typescript-eslint/array-type": [
				"warn",
				{
					default: "array-simple"
				}
			],
			"@typescript-eslint/await-thenable": "warn",
			"@typescript-eslint/class-methods-use-this": "warn",
			"@typescript-eslint/consistent-generic-constructors": ["warn", "type-annotation"],
			"@typescript-eslint/consistent-indexed-object-style": ["warn", "record"],
			"@typescript-eslint/consistent-type-assertions": [
				"warn",
				{
					assertionStyle: "as",
					objectLiteralTypeAssertions: "never"
				}
			],
			"@typescript-eslint/dot-notation": "warn",
			"@typescript-eslint/explicit-module-boundary-types": "warn",
			"@typescript-eslint/indent": "off", // Conflicts with Prettier
			"@typescript-eslint/init-declarations": ["warn", "always"],
			"@typescript-eslint/member-ordering": ["warn", { default: ["signature", "field", "constructor", "accessor", "get", "set", "method"] }],
			"@typescript-eslint/method-signature-style": ["warn", "property"],
			"@typescript-eslint/naming-convention": "off",
			"@typescript-eslint/no-empty-function": "warn",
			"@typescript-eslint/no-empty-interface": "warn",
			"@typescript-eslint/no-extra-parens": "off",
			"@typescript-eslint/no-inferrable-types": [
				"warn",
				{
					ignoreParameters: false,
					ignoreProperties: false
				}
			],
			"@typescript-eslint/no-loop-func": "warn",
			"@typescript-eslint/no-meaningless-void-operator": [
				"warn",
				{
					checkNever: true
				}
			],
			"@typescript-eslint/no-misused-new": "warn",
			"@typescript-eslint/no-non-null-asserted-nullish-coalescing": "warn",
			"@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
			"@typescript-eslint/no-non-null-assertion": "warn",
			"@typescript-eslint/no-redundant-type-constituents": "warn",
			"@typescript-eslint/no-require-imports": "warn",
			"@typescript-eslint/no-shadow": [
				"warn",
				{
					ignoreTypeValueShadow: false,
					ignoreFunctionTypeParameterNameValueShadow: false
				}
			],
			"@typescript-eslint/no-this-alias": "warn",
			"@typescript-eslint/ban-ts-comment": "warn",
			"@typescript-eslint/ban-tslint-comment": "warn",
			"@typescript-eslint/consistent-return": "off",
			"@typescript-eslint/consistent-type-exports": ["warn", { fixMixedExportsWithInlineTypeSpecifier: true }],
			"@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports", fixStyle: "inline-type-imports", disallowTypeAnnotations: true }],
			"@typescript-eslint/default-param-last": "warn",
			"@typescript-eslint/explicit-function-return-type": [
				"warn",
				{
					allowConciseArrowFunctionExpressionsStartingWithVoid: true,
					allowDirectConstAssertionInArrowFunctions: true,
					allowExpressions: true,
					allowFunctionsWithoutTypeParameters: false,
					allowHigherOrderFunctions: false,
					allowIIFEs: true,
					allowTypedFunctionExpressions: true
				}
			],
			"@typescript-eslint/explicit-member-accessibility": [
				"warn",
				{
					accessibility: "explicit"
				}
			],
			"@typescript-eslint/max-params": "off",
			"@typescript-eslint/no-array-constructor": "warn",
			"@typescript-eslint/no-array-delete": "warn",
			"@typescript-eslint/no-base-to-string": [
				"warn",
				{
					ignoredTypeNames: ["warn", "RegExp", "URL", "URLSearchParams"]
				}
			],
			"@typescript-eslint/no-confusing-non-null-assertion": "warn",
			"@typescript-eslint/no-confusing-void-expression": [
				"warn",
				{
					ignoreArrowShorthand: false,
					ignoreVoidOperator: false
				}
			],
			"@typescript-eslint/no-dupe-class-members": "warn",
			"@typescript-eslint/no-duplicate-enum-values": "warn",
			"@typescript-eslint/no-duplicate-type-constituents": [
				"warn",
				{
					ignoreIntersections: false,
					ignoreUnions: false
				}
			],
			"@typescript-eslint/no-dynamic-delete": "warn",
			"@typescript-eslint/no-explicit-any": [
				"warn",
				{
					fixToUnknown: true,
					ignoreRestArgs: false
				}
			],
			"@typescript-eslint/no-unsafe-argument": "warn",
			"@typescript-eslint/no-unsafe-assignment": "warn",
			"@typescript-eslint/no-unsafe-call": "warn",
			"@typescript-eslint/no-extra-non-null-assertion": "warn",
			"@typescript-eslint/no-unsafe-member-access": "warn",
			"@typescript-eslint/no-unsafe-return": "warn",
			"@typescript-eslint/no-extraneous-class": [
				"warn",
				{
					allowConstructorOnly: true,
					allowEmpty: false,
					allowStaticOnly: false,
					allowWithDecorator: true
				}
			],
			"@typescript-eslint/no-floating-promises": [
				"warn",
				{
					ignoreIIFE: false,
					ignoreVoid: false
				}
			],
			"@typescript-eslint/no-for-in-array": "warn",
			"@typescript-eslint/no-implied-eval": "warn",
			"@typescript-eslint/no-import-type-side-effects": "warn",
			"@typescript-eslint/no-invalid-void-type": [
				"warn",
				{
					allowAsThisParameter: false,
					allowInGenericTypeArguments: true
				}
			],
			"@typescript-eslint/no-loss-of-precision": "warn",
			"@typescript-eslint/no-magic-numbers": [
				"off",
				{
					ignoreEnums: true,
					ignoreNumericLiteralTypes: true,
					ignoreReadonlyClassProperties: true,
					ignoreTypeIndexes: true
				}
			],
			"@typescript-eslint/no-misused-promises": [
				"warn",
				{
					checksConditionals: true,
					checksSpreads: true,
					checksVoidReturn: true
				}
			],
			"@typescript-eslint/no-mixed-enums": "warn",
			"@typescript-eslint/no-namespace": [
				"warn",
				{
					allowDeclarations: true,
					allowDefinitionFiles: true
				}
			],
			"@typescript-eslint/class-literal-property-style": ["warn", "getters"],
			"@typescript-eslint/prefer-readonly": ["warn", { onlyInlineLambdas: false }],
			"@typescript-eslint/only-throw-error": "warn",
			"@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
			"@typescript-eslint/no-unnecessary-condition": "warn",
			"@typescript-eslint/no-unnecessary-qualifier": "warn",
			"@typescript-eslint/no-unnecessary-type-arguments": "warn",
			"@typescript-eslint/no-unnecessary-type-assertion": "warn",
			"@typescript-eslint/no-unnecessary-type-constraint": "warn",
			"@typescript-eslint/no-unsafe-declaration-merging": "warn",
			"@typescript-eslint/no-unsafe-enum-comparison": "warn",
			"@typescript-eslint/no-unsafe-unary-minus": "warn",
			"@typescript-eslint/no-unused-expressions": "warn",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-useless-constructor": "warn",
			"@typescript-eslint/no-useless-empty-export": "warn",
			"@typescript-eslint/no-var-requires": "warn",
			"@typescript-eslint/parameter-properties": [
				"warn",
				{
					prefer: "class-property"
				}
			],
			"@typescript-eslint/prefer-as-const": "warn",
			"@typescript-eslint/prefer-destructuring": "warn",
			"@typescript-eslint/prefer-enum-initializers": "warn",
			"@typescript-eslint/prefer-literal-enum-member": "warn",
			"@typescript-eslint/prefer-find": "warn",
			"@typescript-eslint/prefer-for-of": "warn",
			"@typescript-eslint/prefer-function-type": "warn",
			"@typescript-eslint/prefer-includes": "warn",
			"@typescript-eslint/prefer-namespace-keyword": "off",
			"@typescript-eslint/prefer-nullish-coalescing": "warn",
			"@typescript-eslint/prefer-optional-chain": "warn",
			"@typescript-eslint/prefer-promise-reject-errors": "warn",
			"@typescript-eslint/prefer-readonly-parameter-types": "off",
			"@typescript-eslint/prefer-reduce-type-parameter": "warn",
			"@typescript-eslint/prefer-regexp-exec": "warn",
			"@typescript-eslint/prefer-return-this-type": "warn",
			"@typescript-eslint/prefer-string-starts-ends-with": "warn",
			"@typescript-eslint/prefer-ts-expect-error": "warn",
			"@typescript-eslint/promise-function-async": "warn",
			"@typescript-eslint/require-array-sort-compare": "warn",
			"@typescript-eslint/require-await": "warn",
			"@typescript-eslint/restrict-plus-operands": [
				"warn",
				{
					allowAny: false,
					allowBoolean: false,
					allowNullish: false,
					allowNumberAndString: false,
					allowRegExp: false,
					skipCompoundAssignments: false
				}
			],
			"@typescript-eslint/restrict-template-expressions": [
				"warn",
				{
					allowAny: false,
					allowNever: false,
					allowArray: false,
					allowBoolean: false,
					allowNullish: false,
					allowNumber: false,
					allowRegExp: false
				}
			],
			"@typescript-eslint/return-await": ["warn", "always"],
			"@typescript-eslint/sort-type-constituents": [
				"warn",
				{
					checkIntersections: true,
					checkUnions: true
				}
			],
			"@typescript-eslint/space-before-function-paren": "off",
			"@typescript-eslint/strict-boolean-expressions": [
				"warn",
				{
					allowAny: false,
					allowNullableBoolean: false,
					allowNullableEnum: false,
					allowNullableObject: false,
					allowNullableNumber: false,
					allowNullableString: false,
					allowNumber: false,
					allowString: false
				}
			],
			"@typescript-eslint/switch-exhaustiveness-check": [
				"warn",
				{
					requireDefaultForNonUnion: true,
					allowDefaultCaseForExhaustiveSwitch: false
				}
			],
			"@typescript-eslint/triple-slash-reference": [
				"warn",
				{
					lib: "never",
					path: "never",
					types: "never"
				}
			],
			"@typescript-eslint/typedef": "off",
			"@typescript-eslint/unbound-method": "warn",
			"@typescript-eslint/unified-signatures": "warn",
			"@typescript-eslint/use-unknown-in-catch-callback-variable": "warn",
			"@typescript-eslint/no-empty-object-type": "warn",
			"@typescript-eslint/no-deprecated": "warn",
			"@typescript-eslint/consistent-type-definitions": ["warn", "type"], // https://stackoverflow.com/a/67123866
			"@typescript-eslint/no-unnecessary-template-expression": "warn",

			"@typescript-eslint/non-nullable-type-assertion-style": "off",
			"@typescript-eslint/no-unnecessary-type-parameters": "off"
		},

		// Stylistic - https://eslint.style/rules
		...{
			"@stylistic/brace-style": "warn",
			"@stylistic/comma-dangle": "warn",
			"@stylistic/comma-spacing": "warn",
			// "@stylistic/func-call-spacing": "warn",
			"@stylistic/key-spacing": "warn",
			"@stylistic/keyword-spacing": "warn",
			"@stylistic/member-delimiter-style": [
				"warn",
				{
					multiline: { delimiter: "none", requireLast: false },
					singleline: { delimiter: "semi" } // Comma conflicts with Prettier :/
				}
			],
			"@stylistic/no-extra-semi": "warn",
			"@stylistic/object-curly-spacing": ["warn", "always"],
			"@stylistic/semi": ["warn", "never"],
			"@stylistic/space-before-blocks": "warn",
			"@stylistic/space-infix-ops": "warn",
			"@stylistic/type-annotation-spacing": "warn",
			"@stylistic/spaced-comment": "warn",

			// Conflicts with Prettier
			"@stylistic/indent": "off",
			"@stylistic/quotes": "off",
			"@stylistic/quote-props": "off",
			"@stylistic/padded-blocks": "off",
			"@stylistic/function-call-argument-newline": "off",
			"@stylistic/function-paren-newline": "off",
			"@stylistic/no-extra-parens": "off",
			"@stylistic/implicit-arrow-linebreak": "off",
			"@stylistic/arrow-parens": "off",
			"@stylistic/indent-binary-ops": "off",
			"@stylistic/multiline-ternary": "off",
			"@stylistic/array-element-newline": "off",
			"@stylistic/space-before-function-paren": "off",
			"@stylistic/object-property-newline": "off",
			"@stylistic/dot-location": "off",
			"@stylistic/nonblock-statement-body-position": "off",
			"@stylistic/lines-around-comment": "off",
			"@stylistic/multiline-comment-style": "off",
			"@stylistic/no-confusing-arrow": "off"
		},

		// Prettier - https://www.npmjs.com/package/eslint-plugin-prettier#configuration-new-eslintconfigjs
		...{
			"prettier/prettier": "warn"
		}
	},

	// Apply to only TypeScript source code & configuration files
	files: ["source/**/*.ts", "**/.config.ts", "eslint.d.ts"],
	ignores: [
		"node_modules",
		"dist",
		"**/*.js",
		"**/*.config.js",

		// Cloudflare Wrangler
		"source/types/worker.d.ts"
	]
})
