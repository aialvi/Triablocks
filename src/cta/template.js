const template = [
	[
		"core/columns",
		{
			className: "cta-columns",
		},
		[
			[
				"core/column",
				{
					width: 80,
					className: "cta-column",
				},
				[
					[
						"core/paragraph",
						{
							className: "cta-paragraph",
							placeholder:
								"Duis aute irure dolor in reprehenderit in voluptate velit.",
						},
					],
				],
			],
			[
				"core/column",
				{
					width: 20,
					className: "cta-column",
				},
				[
					[
						"core/button",
						{
							text: "Call To Action",
						},
					],
				],
			],
		],
	],
];

export default template;
