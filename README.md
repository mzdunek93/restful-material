Aid in writing apps in [MaterialUI](https://github.com/callemall/material-ui)

# Usage

```js
import React from "react";
import Restful,
       { RestInput, Intl, createStore, Model } from "restful-material";
import { RaisedButton, Styles, CircularProgress } from "material-ui";

Restful.configure({
  ajax: {
    url: 'http://example.com',
    beforeSend: (xhr)=> {
      React.withContext({muiTheme: Styles.ThemeManager().getCurrentTheme()}, function(){
        React.render(<CircularProgress size={5} />, document.getElementById('spinner'));
      })
    },
    onCompleted: ()=> {
      React.unmountComponentAtNode(document.getElementById('spinner'))
    }
})

var store = createStore({
  get(id) {
    return this.ajax.get(id).then((data)=> new Model(data));
  },

  add(data) {
    return this.ajax.put(data);
  }
})

var intl = new Intl({header: "A header", submit: "Submit"});

var Form = React.createClass({
  componentWillMount() {
    store.get(this.props.id).then((resource)=> this.setState({resource: resource}));
  },

  submit() {
    store.update(model.toObject()).then(()=> console.log("OK"),
                                        ()=> console.log("Error"))
  },

  render() {
    return (
      <div>
        <h2>{intl.msg("header")}</h2>
        <RestInput model={this.props.model} attribute={'foo'} type="string" />
        <RaisedButton label={intl.msg("submit")} onClick={this.submit} />
      </div>
    );
  }
});

var div = document.createElement("div");
document.body.appendChild(div);
React.render(<Form id={1} />, div);
```

# Building

Run `npm run build`

# Testing

Run `npm test:watch`

In order for all of the tests to pass you have to have nodejs in version 0.10 [reference](https://github.com/facebook/jest/issues/243).
