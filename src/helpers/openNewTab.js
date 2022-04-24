export default function openNewTab(link) {
  const win = window.open(link, '_blank');
  win && win.focus();
}