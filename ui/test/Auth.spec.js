import React from 'react';
import {spy} from "sinon";
import {expect} from "chai";
import {mount, shallow} from "enzyme";
import AuthenticatedComponent from "../src/js/components/Auth";
import {configure} from "enzyme/build/index";
import Adapter from "enzyme-adapter-react-16/build/index";

configure({adapter: new Adapter()});


describe('<Auth /> ', () => {

  it('viewRoute is called when component mounts', () => {

    const viewRoute = spy()
    const wrapper = mount(<AuthenticatedComponent component={<div></div>} viewRoute={viewRoute}/>)

    expect(viewRoute.called).to.equal(true)
  })
})