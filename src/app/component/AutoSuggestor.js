import React, { Component } from "react";

class AutoSuggestor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            selected: -1
        };

        this.visible = 0;
        //This will be part of props with ajax implementation
        this.mockData = [
            {
                id: "123-s2-546",
                name: "John Jacobs",
                items: [
                    "bucket",
                    "bottle"
                ],
                address: "1st Cross, 9th Main, abc Apartment",
                pincode: "5xx012"
            },
            {
                id: "123-s3-146",
                name: "David Mire",
                items: [
                    "Bedroom Set"
                ],
                address: "2nd Cross, BTI Apartment",
                pincode: "4xx012"
            },
            {
                id: "223-a1-234",
                name: "Soloman Marshall",
                items: [
                    "bottle"
                ],
                address: "Riverbed Apartment",
                pincode: "4xx032"
            },
            {
                id: "121-s2-111",
                name: "Ricky Beno",
                items: [
                    "Mobile Set"
                ],
                address: "Sunshine City",
                pincode: "5xx072"
            },
            {
                id: "123-p2-246",
                name: "Sikander Singh",
                items: [
                    "Air Conditioner"
                ],
                address: "Riverbed Apartment",
                pincode: "4xx032"
            },
            {
                id: "b23-s2-321",
                name: "Ross Wheeler",
                items: [
                    "Mobile"
                ],
                address: "1st Cross, 9th Main, abc Apartement",
                pincode: "5xx012"
            },
            {
                id: "113-n2-563",
                name: "Ben Bish",
                items: [
                    "Kitchen Set",
                    "Chair"
                ],
                address: "Sunshine City",
                pincode: "5xx072"
            },
            {
                id: "323-s2-112",
                name: "John Michael",
                items: [
                    "Refrigerator"
                ],
                address: "1st Cross, 9th Main, abc Apartement",
                pincode: "5xx012"
            },
            {
                id: "abc-34-122",
                name: "Jason Jordan",
                items: [
                    "Mobile"
                ],
                address: "Riverbed Apartment",
                pincode: "4xx032"
            }
        ]
    }

    setAsSelected = (event) => {
        if (event.type === "mouseover") {
            this.setState({ selected: event.currentTarget.dataset.index > -1 ? parseInt(event.currentTarget.dataset.index) : -1 });
        } else {
            if (event.keyCode === 40) {
                event.preventDefault();
                if (this.state.selected === (this.visible - 1)) {
                    this.setState({ selected: 0 });
                } else {
                    this.setState({ selected: this.state.selected + 1 });
                }
            } else if (event.keyCode === 38) {
                event.preventDefault();
                if (this.state.selected === 0) {
                    this.setState({ selected: this.visible - 1 });
                } else {
                    this.setState({ selected: this.state.selected - 1 });
                }
            }
        }
    };

    getSuggestions() {
        const { setAsSelected } = this;
        const self = this;
        const { search, selected } = this.state;
        const searchText = search.toLowerCase();
        let suggestionHtml = [];

        self.visible = 0;

        if (searchText.trim() === "") {
            suggestionHtml = null;
        } else {
            this.mockData.forEach(function (mock) {
                if (mock.id.toLowerCase().indexOf(searchText) > -1 || mock.name.toLowerCase().indexOf(searchText) > -1 || mock.address.toLowerCase().indexOf(searchText) > -1) {
                    self.visible++;
                    suggestionHtml.push(<div data-name={mock.name} data-index={suggestionHtml.length} onMouseOver={setAsSelected}
                                             key={mock.id}
                                             className={"suggestion" + (selected === suggestionHtml.length ? " selected" : "")}>
                        <p className="bold">{mock.id}</p>
                        <p>{mock.name}</p>
                        <p>{mock.address + ", " + mock.pincode}</p>
                    </div>);
                }
            });

            if (suggestionHtml.length === 0) {
                suggestionHtml = <div className="no-result">No Results Found</div>;
            }
        }

        return suggestionHtml;
    };

    suggestResult = (event) => {
        this.setState({ search: event.target.value, selected: -1 });
    };

    resetSearch = () => {
        this.setState({ search: "", selected: -1 })
    };

    render() {
        const { search } = this.state;

        return (<div className="comp-shell">
            <input type="text" value={search} onChange={this.suggestResult} onKeyDown={this.setAsSelected}
                   className="search-input"
                   placeholder="Search users by id, address, name"/>
            <span className="cross" onClick={this.resetSearch}>X</span>
            <div className="suggestion-cont">
                {this.getSuggestions()}
            </div>
        </div>);
    }
}

export default AutoSuggestor;