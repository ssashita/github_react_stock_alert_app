import React, { Component } from "react"
import AutoSuggest from "react-autosuggest"
import IsolatedScroll from "react-isolated-scroll"
import MenuItem from "@material-ui/core/MenuItem"

function shouldRenderSuggestions(value) {
    return value.trim().length > 2;
};
function renderSuggestionsContainer({ containerProps, children }) {
    const { ref, ...restContainerProps } = containerProps;
    const callRef = isolatedScroll => {
        if (isolatedScroll !== null) {
            ref(isolatedScroll.component);
        }
    };

    return (
        <IsolatedScroll ref={callRef} {...restContainerProps}>
            {children}
        </IsolatedScroll>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.symbol;
}
class PaginatedAutoSuggest extends Component {
  state = { value: "" };
  componentWillMount() {
    this.setState({ suggestions: [] });
  }
  onSuggestionsFetchRequested = ({ value, reason }) => {
    if (value && value.trim().length > 2 && reason === "input-changed") {
      this.props.getSymbolsFromQuery(value.trim()).then(symbols => {
        this.setState({ suggestions: symbols });
      });
    }
    this.setState({ suggestions: [] });
  };
  onChange = (event, { newValue }) => {
    console.log(event);
    this.setState({
      value: newValue
    });
      this.props.onChange(event, { suggestionValue: newValue });
  };

  resetSuggestions = event => {
    this.setState({
      suggestions: []
    });
  };
  grabSuggestion = (event, { suggestionValue }) => {
    this.setState({
        value: suggestionValue
    });
    this.props.onChange(event, { suggestionValue });
  };
  render = () => {
    const { value } = this.state;
    const inputProps = {
      value, // usually comes from the application state
      onChange: this.onChange, // called every time the input value changes
      onBlur: this.resetSuggestions, // called when the input loses focus, e.g. when user presses Tab
      type: "search",
      placeholder: this.props.placeholder || "Enter Query"
    };
    return (
      <AutoSuggest
        onSuggestionSelected={this.grabSuggestion}
        onSuggestionsClearRequested={this.resetSuggestions}
        suggestions={this.state.suggestions}
        shouldRenderSuggestions={shouldRenderSuggestions}
        renderSuggestion={this.props.renderSuggestion}
        getSuggestionValue={getSuggestionValue}
        // renderSuggestionsContainer={renderSuggestionsContainer}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        inputProps={inputProps}
        highlightFirstSuggestion={true}
      />
    );
  };
}

export default PaginatedAutoSuggest;