let tmp: React.ReactElement | null = null;

const RouteWrapper = ({
  element,
  title,
}: {
  element: React.ReactElement;
  title: string;
}) => {
  document.title = title;
  if (tmp == element) return tmp;

  tmp = element;
  return element;
};

export default RouteWrapper;
