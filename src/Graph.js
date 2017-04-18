import React, { Component } from 'react';
import * as d3 from 'd3';
import './../css/Graph.css';

class Graph extends Component {
  graph = () => {
    const { width, height } = this.props;
     var markerWidth = 6,
        markerHeight = 6,
        cRadius = 18, // play with the cRadius value
        refX = cRadius + (markerWidth * 2),
        refY = -Math.sqrt(cRadius),
        drSub = cRadius + refY;


    d3.selectAll("svg").remove();

    var svg = d3.select(this.refs.mountPoint).append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("svg:defs").selectAll("marker")
        .data(["end"])
        .enter().append("svg:marker")
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", refX)
        .attr("refY", 0)
        .attr("markerWidth", markerWidth)
        .attr("markerHeight", markerHeight)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");



    let force = d3.layout.force()
      .nodes(d3.values(this.props.nodes))
      .links(d3.values(this.props.links))
      .size([width, height])
      .linkDistance(350)
      .charge(-1500)
      .gravity(0.3)
      .on("tick", tick)
      .start();


    var path = svg.append("svg:g").selectAll("path")
      .data(this.props.links)
      .enter().append("svg:path")
      .attr('class','link')
      .attr("marker-end", "url(#end)");

    var circle = svg.append("svg:g").selectAll("circle")
      .data(force.nodes())
      .enter().append("svg:circle")
      .attr("r", cRadius)
      .call(force.drag).on("mouseover", fade(.1)).on("mouseout", fade(1));;


       var linkedByIndex = {};
    this.props.links.forEach(function(d) {
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });

    function isConnected(a, b) {
        return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
    }

    var text = svg.append("svg:g").selectAll("g")
        .data(force.nodes())
        .enter().append("svg:g");


         text.append("svg:text")
        .attr("x", 0)
        .attr("y", ".51em")
        .attr("class", "shadow")
        .style("font-size", 20)
        .text(function (d) {
        return d.name;
    });

    text.append("svg:text")
        .attr("x", 0)
        .attr("y", ".100em")
        .style("font-size", 20)
        .text(function (d) {
        return d.name;
    });

    // Use elliptical arc path segments to doubly-encode directionality.
    function tick() {
        path.attr("d", function (d) {
            var dx = d.target.x - d.source.x,
                dy = (d.target.y - d.source.y),
                dr = Math.sqrt(dx * dx + dy * dy);
            return "M" + d.source.x + "," + d.source.y + "A" + (dr - drSub) + "," + (dr - drSub) + " 0 0,1 " + d.target.x + "," + d.target.y;
        });

        circle.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

        text.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    }


var drag = force.drag()
    .on("dragstart", function(d) {
       d3.select(this).classed("fixed", d.fixed = true);
     });

     function fade(opacity) {
        return function(d) {
            circle.style("stroke-opacity", function(o) {
                this.Opacity = isConnected(d, o) ? 1 : opacity;
                this.setAttribute('fill-opacity', this.Opacity);
                return this.Opacity;
            });

            path.style("stroke-opacity", function(o) {
                return o.source === d || o.target === d ? 1 : opacity;
            });
        };
    }
  }

  render() {
    const { width, height } = this.props;
    const styles = {
      width,
      height,
      bottom: 0,
      position: 'fix',

    };

     return (
        <div style={ styles } ref="mountPoint" >
        { this.graph() }
        </div>
      );
  }
}

export default Graph;
