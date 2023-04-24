// a simple listing component
export default function Listing({ network, id }) {
  return (<div
    data-widget="m-claim-complete"
    data-id={id}
    data-network={network}
  ></div>)
}
