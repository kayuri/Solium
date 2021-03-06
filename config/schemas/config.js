/**
 * @fileoverview Schema of the latest config object that is supplied to Solium
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

// A fully qualified object for this Schema is:
/*
{
	"extends": "solium:all",
	"rules": {
	 	"pragma-on-top": "off",
		"no-with": "warning",
		"deprecated-suicide": "error",
		"variable-declarations": 0,
		"imports-on-top": 1,
		"array-declarations": 2,
		"operator-whitespace": ["off", "double"],
		"lbrace": ["warning", 1, 2, {a: 100, h: "world"}],
		"mixedcase": ["error"],
		"camelcase": [0, 100, "hello", 9.283],
		"uppercase": [1],
		"double-quotes": [2, "double"]
	},
	"options": { "autofix": true, "returnInternalIssues": true }
}
*/

'use strict';

var severityString = { type: 'string', enum: ['off', 'warning', 'error'] },
	severityInt = { type: 'integer', minimum: 0, maximum: 2 },
	severityArray = {
		type: 'array',
		minItems: 1,
		items: [{ oneOf: [severityString, severityInt] }]
	};

var Schema = {
	type: 'object',

	anyOf: [
		{ required: ['extends'] },
		{ required: ['rules'] }
	],

	properties: {

		extends: {
			type: 'string',
			minLength: 1
		},

		rules: {
			type: 'object',
			patternProperties: {
				'^.+$': {
					oneOf: [severityString, severityInt, severityArray]
				}
			},
			additionalProperties: false
		},

		options: {
			type: 'object',
			properties: {
				autofix: { type: 'boolean' },
				returnInternalIssues: { type: 'boolean' }
			},
			additionalProperties: false
		}

	},

	additionalProperties: false
};


module.exports = Schema;