type ISSPositionProps = {
  iss_position: { longitude: number; latitude: number };
};

export const getIssLocation = async () => {
  const updateISSLocation = async () => {
    const dataISScurrentLocation: ISSPositionProps = await fetch(
      "http://api.open-notify.org/iss-now.json"
    )
      .then((response) => response.json())
      .then((data) => data);

    const { iss_position: ISScurrentLocation } = dataISScurrentLocation;

    const longitude = Number(ISScurrentLocation.longitude);
    const latitude = Number(ISScurrentLocation.latitude);

    return { longitude, latitude };
  };

  return updateISSLocation();
};