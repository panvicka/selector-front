<script>
	// @ts-nocheck
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';
	import 'gridjs/dist/theme/mermaid.css';
	import dayjs from 'dayjs';
	import { camelize } from 'utils/stringUtils';

	export let data = {};
	export let item = {};

	let grid;
	let mappedTableData;
	let columns;

	console.log(data);

	let showInactivePeople = false;

	let mapColumns = (item) => {
		let dateColumns = [];

		item.roles.forEach((role) => {
			dateColumns.push(role.name);
			dateColumns.push(`last time in ${role.name}`);
		});

		let mapped = dateColumns.map((i) => {
			if (i.startsWith('last')) {
				return {
					id: camelize(i),
					name: i,
					sort: {
						compare: (a, b) => {
							if (!a) return -1;
							const distantFuture = dayjs('02/10/2060');
							const dateA = a ? dayjs(a, 'DD.MM.YYYY') : distantFuture;
							const dateB = b ? dayjs(b, 'DD.MM.YYYY') : distantFuture;
							if (dateA.isBefore(dateB)) {
								return 1;
							} else if (dateB.isBefore(dateA)) {
								return -1;
							} else {
								return 0;
							}
						}
					}
				};
			}

			return {
				id: camelize(i),
				name: i,
				width: '15%'
			};
		});

		return [
			{
				id: 'name',
				name: 'name',
				formatter: (cell, row) =>
					html(`<span class="${row.cells[1].data === 'no' && 'text-error'} ">${cell} </span>`)
			},
			{ id: 'active', name: 'active', width: '6%', hidden: true },
			...mapped
		];
	};

	const findKeyPositionInArray = (arr, key, value) => {
		return arr.findIndex((element) => {
			if (element[key] == value) {
				return true;
			}
		});
	};

	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}

	let mapData = (data) => {
		let tableData = [];

		for (const key in data) {
			data[key].forEach((roleAttendance) => {
				const position = findKeyPositionInArray([...tableData], 'name', roleAttendance.name);
				const allDates = roleAttendance.dates.map((date) => {
					return formatDate(date);
				});
				if (position !== -1) {
					tableData[position][camelize(key)] = roleAttendance.attended;
					tableData[position][camelize(`last Time In ${key}`)] = roleAttendance.latestDate
						? formatDate(roleAttendance.latestDate)
						: '';
				} else {
					tableData.push({
						name: roleAttendance.name,
						active: roleAttendance.active ? 'yes' : 'no',
						[camelize(key)]: roleAttendance.attended,

						[camelize(`last Time In ${key}`)]: roleAttendance.latestDate
							? formatDate(roleAttendance.latestDate)
							: ''
					});
				}
			});
		}

		if (showInactivePeople === false) {
			let filteredData = tableData.filter((person) => person.active === 'yes');
			return filteredData;
		}
		return tableData;
	};

	mappedTableData = mapData(data);
	columns = mapColumns(item);

	const className = {
		container: 'people-table'
	};

	$: {
		if (grid) {
			mappedTableData = mapData(data);
			columns = mapColumns(item);
			grid.updateConfig({ data: mappedTableData, columns: columns }).forceRender();
		}
	}
</script>

<label class="cursor-pointer label w-40">
	<span class="label-text">show inactive people in the table</span>
	<input
		type="checkbox"
		class="toggle toggle-primary"
		bind:checked={showInactivePeople}
		on:change={() => {
			mappedTableData = mapData(data);
			columns = mapColumns(item);
			grid.updateConfig({ data: mappedTableData, columns: columns }).forceRender();
		}}
	/>
</label>
<Grid bind:instance={grid} data={mappedTableData} {columns} sort={true} {className} />

<style global>
	/* @import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css'; */

	td.gridjs-td {
		word-break: break-all;
	}

	.people-table {
		line-height: 1;
	}

	.people-table tr:hover td {
		background: hsl(var(--nf));
	}

	.people-table td {
		background: hsl(var(--n));
		color: hsl(var(--bc));
		border-color: hsl(var(--nf));
	}

	.people-table th {
		background: hsl(var(--n));
		color: hsl(var(--af)) !important;
		border-color: hsl(var(--nf));
	}

	.people-table th:hover {
		background: hsl(var(--n));
		color: hsl(var(--af)) !important;
	}

	.gridjs-table {
		border: none !important;
		width: 100%;
	}
	.gridjs-wrapper {
		border: none;
		/* width: 80%;
		max-width: 900px; */
		margin: 0 auto;
	}
</style>