$(document).ready(() => {
	$("#endDate, #startDate").on("change", getInputDate);
	let trainingStartDate = localStorage.getItem("trainingStartDate");
	let trainingEndDate = localStorage.getItem("trainingEndDate");
	if (trainingStartDate !== null && trainingStartDate !== undefined) {
		let date = new Date(trainingStartDate);
		let yyyy = date.getFullYear(),
			mm = date.getMonth() + 1,
			dd = date.getDate();
		date = `${yyyy}-${mm < 10 ? "0" + mm : mm}-${dd < 10 ? "0" + dd : dd}`;
		$("#startDate").val(date);
	}
	if (trainingEndDate !== null && trainingEndDate !== undefined) {
		let date = new Date(trainingEndDate);
		let yyyy = date.getFullYear(),
			mm = date.getMonth() + 1,
			dd = date.getDate();
		date = `${yyyy}-${mm < 10 ? "0" + mm : mm}-${dd < 10 ? "0" + dd : dd}`;
		$("#endDate").val(date).change();
	}
});

const today = new Date();

function getInputDate() {
	let endDate = $("#endDate").val(),
		startDate = $("#startDate").val();
	if (endDate !== "Invalid Date" && startDate !== "Invalid Date") {
		let endDateISO = new Date(endDate),
			startDateISO = new Date(startDate),
			daysToEnd = datediff(startDateISO, endDateISO),
			daysToStart = datediff(startDateISO, today);
		$("#daysUntilDone").text(daysToEnd);
		localStorage.setItem("trainingStartDate", startDateISO);
		localStorage.setItem("trainingEndDate", endDateISO);
		buildCalendar(daysToEnd, daysToStart);
	}
}

function datediff(first, second) {
	return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

function daysInMonth(month) {
	return new Date(new Date().getFullYear(), month, 0).getDate();
}

function percentage(partialValue, totalValue) {
	return (100 * partialValue) / totalValue;
}

function buildCalendar(daysToEnd, daysToStart) {
	let tb = $("tbody");
	tb.html("");
	for (let i = 0; i < daysToEnd; i++) {
		if (i % 7 === 0) {
			tb.append("<tr>");
		}
		tb.append(
			`<td class="${daysToStart > i ? "crossed" : ""}"><span>${
				i + 1
			}</span><p>${percentage(i + 1, daysToEnd).toFixed(0)}%</p></td>`
		);
		if (i % 7 === 0) {
			tb.append("</tr>");
		}
	}
}
