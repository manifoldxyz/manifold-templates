// a simple listing component
export default function Listing({ network, id }) {
  return (<div
    data-widget="m-layout-complete-listing"
    data-id={id}
    data-network={network}
  ></div>)
}
