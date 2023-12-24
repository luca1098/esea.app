export const scrollToTop = () => {
  const el = document.getElementById('body');
  el?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};
