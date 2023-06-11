import { Input } from "antd";

function GoogleMapsAutocomplete({ setAddress, address }) {
  function handlePlaceSelect() {
    const input = document.getElementById("autocomplete");
    const options = {
      types: ["geocode"],
      language: "en",
    };
    const autocomplete = new window.google.maps.places.Autocomplete(
      input,
      options
    );
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address);
    });
  }

  return (
    <div>
      <Input
      style={{width:'80%'}}
        required="true"
        id="autocomplete"
        type="text"
        placeholder="Enter your address"
        onFocus={handlePlaceSelect}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
  );
}

export default GoogleMapsAutocomplete;
