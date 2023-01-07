<script lang="ts">
	// @ts-nocheck

	import Grid from 'gridjs-svelte';
	import { h } from 'gridjs';
	import 'gridjs/dist/theme/mermaid.css';
	import { onMount } from 'svelte';
	import { SvelteWrapper } from 'gridjs-svelte/plugins';

	import { createEventDispatcher } from 'svelte';
	import { camelize } from 'utils/stringUtils';
	import { addToArrayIfKeyValueDoesntExist } from 'utils/arrayUtils';
	import dayjs from 'dayjs';
	import { formatDate } from 'utils/date';
	import EventTableButton from './EventTableButton.svelte';
	const dispatch = createEventDispatcher();

	export let eventsToShow = [];
	export let itemHasIntervalTracking = false;
	let mappedTableData = [];
	let columns = ['startDate', 'endDate'];

	let participantTableHeaderTitles = [];

	const getParticipantTitles = (events) => {
		events.forEach((event) => {
			event.participants.forEach((participant) => {
				const aux = {
					id: camelize(participant.role.name),
					name: participant.role.name
				};

				participantTableHeaderTitles = addToArrayIfKeyValueDoesntExist(
					participantTableHeaderTitles,
					'id',
					aux
				);
			});
		});
	};

	onMount(async () => {
		getParticipantTitles(eventsToShow);
	});

	let mapDataNew = (events) => {
		console.log(events);
		let auxObject = {};
		return events.map((event) => {
			auxObject = {};
			// let personNames: string = '';
			event.participants.forEach((participant) => {
				if (auxObject[camelize(participant.role.name)]) {
					auxObject[camelize(participant.role.name)] = `${
						auxObject[camelize(participant.role.name)]
					}, ${participant.person.name} `;
				} else {
					auxObject = { ...auxObject, [camelize(participant.role.name)]: participant.person.name };
				}
			});

			return {
				startDate: formatDate(event.startDate),
				endDate: event.endDate ? formatDate(event.endDate) : '',
				id: event._id,
				...auxObject
			};
		});
	};

	let mapColumns = (events) => {
		return [
			{
				name: 'id',
				hidden: true
			},
			{
				name: 'startDate',
				id: 'startDate',
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
			},
			{
				name: 'endDate',
				id: 'endDate',
				hidden: !itemHasIntervalTracking,
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
			},

			...participantTableHeaderTitles,
			{
				name: 'Edit',
				sort: false,
				width: '5%',
				data: (row) => {
					return { row, submitFce: submitEdit, icon: 'faPen' };
				},
				plugin: {
					component: SvelteWrapper,
					props: {
						component: EventTableButton
					}
				}
			},
			{
				name: 'Delete',
				sort: false,
				width: '5%',
				data: (row) => {
					return { row, submitFce: submitDelete, icon: 'faTrash' };
				},
				plugin: {
					component: SvelteWrapper,
					props: {
						component: EventTableButton
					}
				}
			}
		];
	};

	let grid;

	$: {
		if (grid) {
			mappedTableData = mapDataNew(eventsToShow);
			console.log(mappedTableData);
			columns = mapColumns(eventsToShow);
			grid.updateConfig({ data: mappedTableData, columns: columns }).forceRender();
		}
	}

	function submitEdit(eventId) {
		dispatch('submitEdit', {
			eventId
		});
	}

	function submitDelete(eventId) {
		dispatch('submitDelete', {
			eventId
		});
	}
	const className = {
		container: 'event-table'
	};
</script>

<Grid
	bind:instance={grid}
	data={mappedTableData}
	{columns}
	pagination={true}
	sort={true}
	{className}
/>

<style global>
	/* @import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css'; */

	.event-table tr:hover td {
		background: hsl(var(--nf));
	}

	[data-column-id='edit'] div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	[data-column-id='delete'] div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.event-table {
		line-height: 1;
	}
	.event-table td {
		background: hsl(var(--n));
		color: hsl(var(--bc));
		border-color: hsl(var(--nf));
	}

	.event-table th {
		background: hsl(var(--n));
		color: hsl(var(--af)) !important;
		border-color: hsl(var(--nf));
	}

	.event-table th:hover {
		background: hsl(var(--n));
		color: hsl(var(--af)) !important;
	}

	.event-table .gridjs-footer {
		background: hsl(var(--n));
		color: hsl(var(--af)) !important;
		border: none;
	}

	.event-table .gridjs-pagination {
		background: hsl(var(--n));
		color: hsl(var(--af)) !important;
	}

	.gridjs-table {
		border: none !important;
		width: 100%;
	}
	.gridjs-wrapper {
		border: none;
		margin: 0 auto;
	}
</style>
