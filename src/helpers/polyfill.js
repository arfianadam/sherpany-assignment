export function splice(array, start, deleteCount, item) {
  return [...array.slice(0, start), item, ...array.slice(start + deleteCount)];
}

export function flattenAgenda(agendaList) {
  const newFlattenAgenda = [];
  agendaList.map(agenda => { // eslint-disable-line
    newFlattenAgenda.push(agenda);
    if (agenda.items.length > 0) {
      agenda.items.map(subAgenda => { // eslint-disable-line
        newFlattenAgenda.push(subAgenda);
      });
    }
  });
  return newFlattenAgenda;
}

export function sliceFileName(fileName) {
  const extensionRegex = /\.pdf/g;
  const numRegex = /(\d+)(\.(\d+))?/;
  // const nameRegex = /[a-zA-Z]+/g;
  const extensionRemoved = fileName.slice(0, extensionRegex.exec(fileName).index);
  const agendaNumMatch = numRegex.exec(fileName);
  // const agendaNameMatch = nameRegex.exec(extensionRemoved);
  const agendaNum = agendaNumMatch ? agendaNumMatch[0] : null;
  // const agendaName = agendaNameMatch ? agendaNameMatch[0] : null;
  return {
    num: agendaNum,
    name: extensionRemoved
  };
}
