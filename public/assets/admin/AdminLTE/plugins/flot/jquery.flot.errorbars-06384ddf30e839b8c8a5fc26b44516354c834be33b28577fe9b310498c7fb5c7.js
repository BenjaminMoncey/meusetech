/* Flot plugin for plotting error bars.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

Error bars are used to show standard deviation and other statistical
properties in a plot.

* Created by Rui Pereira  -  rui (dot) pereira (at) gmail (dot) com

This plugin allows you to plot error-bars over points. Set "errorbars" inside
the points series to the axis name over which there will be error values in
your data array (*even* if you do not intend to plot them later, by setting
"show: null" on xerr/yerr).

The plugin supports these options:

	series: {
		points: {
			errorbars: "x" or "y" or "xy",
			xerr: {
				show: null/false or true,
				asymmetric: null/false or true,
				upperCap: null or "-" or function,
				lowerCap: null or "-" or function,
				color: null or color,
				radius: null or number
			},
			yerr: { same options as xerr }
		}
	}

Each data point array is expected to be of the type:

	"x"  [ x, y, xerr ]
	"y"  [ x, y, yerr ]
	"xy" [ x, y, xerr, yerr ]

Where xerr becomes xerr_lower,xerr_upper for the asymmetric error case, and
equivalently for yerr. Eg., a datapoint for the "xy" case with symmetric
error-bars on X and asymmetric on Y would be:

	[ x, y, xerr, yerr_lower, yerr_upper ]

By default no end caps are drawn. Setting upperCap and/or lowerCap to "-" will
draw a small cap perpendicular to the error bar. They can also be set to a
user-defined drawing function, with (ctx, x, y, radius) as parameters, as eg.

	function drawSemiCircle( ctx, x, y, radius ) {
		ctx.beginPath();
		ctx.arc( x, y, radius, 0, Math.PI, false );
		ctx.moveTo( x - radius, y );
		ctx.lineTo( x + radius, y );
		ctx.stroke();
	}

Color and radius both default to the same ones of the points series if not
set. The independent radius parameter on xerr/yerr is useful for the case when
we may want to add error-bars to a line, without showing the interconnecting
points (with radius: 0), and still showing end caps on the error-bars.
shadowSize and lineWidth are derived as well from the points series.

*/
!function(r){function e(r,e,n,i){if(e.points.errorbars){var a=[{x:!0,number:!0,required:!0},{y:!0,number:!0,required:!0}],o=e.points.errorbars;"x"!=o&&"xy"!=o||(e.points.xerr.asymmetric?(a.push({x:!0,number:!0,required:!0}),a.push({x:!0,number:!0,required:!0})):a.push({x:!0,number:!0,required:!0})),"y"!=o&&"xy"!=o||(e.points.yerr.asymmetric?(a.push({y:!0,number:!0,required:!0}),a.push({y:!0,number:!0,required:!0})):a.push({y:!0,number:!0,required:!0})),i.format=a}}function n(r,e){var n=r.datapoints.points,i=null,a=null,o=null,p=null,t=r.points.xerr,l=r.points.yerr,s=r.points.errorbars;"x"==s||"xy"==s?t.asymmetric?(i=n[e+2],a=n[e+3],"xy"==s&&(l.asymmetric?(o=n[e+4],p=n[e+5]):o=n[e+4])):(i=n[e+2],"xy"==s&&(l.asymmetric?(o=n[e+3],p=n[e+4]):o=n[e+3])):"y"==s&&(l.asymmetric?(o=n[e+2],p=n[e+3]):o=n[e+2]),null==a&&(a=i),null==p&&(p=o);var u=[i,a,o,p];return t.show||(u[0]=null,u[1]=null),l.show||(u[2]=null,u[3]=null),u}function i(r,e,i){var o=i.datapoints.points,p=i.datapoints.pointsize,t=[i.xaxis,i.yaxis],l=i.points.radius,s=[i.points.xerr,i.points.yerr],u=!1;if(t[0].p2c(t[0].max)<t[0].p2c(t[0].min)){u=!0;var m=s[0].lowerCap;s[0].lowerCap=s[0].upperCap,s[0].upperCap=m}var c=!1;if(t[1].p2c(t[1].min)<t[1].p2c(t[1].max)){c=!0;var m=s[1].lowerCap;s[1].lowerCap=s[1].upperCap,s[1].upperCap=m}for(var h=0;h<i.datapoints.points.length;h+=p)for(var x=n(i,h),y=0;y<s.length;y++){var d=[t[y].min,t[y].max];if(x[y*s.length]){var f=o[h],v=o[h+1],w=[f,v][y]+x[y*s.length+1],C=[f,v][y]-x[y*s.length];if("x"==s[y].err&&(v>t[1].max||v<t[1].min||w<t[0].min||C>t[0].max))continue;if("y"==s[y].err&&(f>t[0].max||f<t[0].min||w<t[1].min||C>t[1].max))continue;var b=!0,g=!0;if(w>d[1]&&(b=!1,w=d[1]),C<d[0]&&(g=!1,C=d[0]),"x"==s[y].err&&u||"y"==s[y].err&&c){var m=C;C=w,w=m,m=g,g=b,b=m,m=d[0],d[0]=d[1],d[1]=m}f=t[0].p2c(f),v=t[1].p2c(v),w=t[y].p2c(w),C=t[y].p2c(C),d[0]=t[y].p2c(d[0]),d[1]=t[y].p2c(d[1]);var q=s[y].lineWidth?s[y].lineWidth:i.points.lineWidth,k=null!=i.points.shadowSize?i.points.shadowSize:i.shadowSize;if(q>0&&k>0){var S=k/2;e.lineWidth=S,e.strokeStyle="rgba(0,0,0,0.1)",a(e,s[y],f,v,w,C,b,g,l,S+S/2,d),e.strokeStyle="rgba(0,0,0,0.2)",a(e,s[y],f,v,w,C,b,g,l,S/2,d)}e.strokeStyle=s[y].color?s[y].color:i.color,e.lineWidth=q,a(e,s[y],f,v,w,C,b,g,l,0,d)}}}function a(e,n,i,a,p,t,l,s,u,m,c){a+=m,p+=m,t+=m,"x"==n.err?(p>i+u?o(e,[[p,a],[Math.max(i+u,c[0]),a]]):l=!1,i-u>t?o(e,[[Math.min(i-u,c[1]),a],[t,a]]):s=!1):(a-u>p?o(e,[[i,p],[i,Math.min(a-u,c[0])]]):l=!1,t>a+u?o(e,[[i,Math.max(a+u,c[1])],[i,t]]):s=!1),u=null!=n.radius?n.radius:u,l&&("-"==n.upperCap?"x"==n.err?o(e,[[p,a-u],[p,a+u]]):o(e,[[i-u,p],[i+u,p]]):r.isFunction(n.upperCap)&&("x"==n.err?n.upperCap(e,p,a,u):n.upperCap(e,i,p,u))),s&&("-"==n.lowerCap?"x"==n.err?o(e,[[t,a-u],[t,a+u]]):o(e,[[i-u,t],[i+u,t]]):r.isFunction(n.lowerCap)&&("x"==n.err?n.lowerCap(e,t,a,u):n.lowerCap(e,i,t,u)))}function o(r,e){r.beginPath(),r.moveTo(e[0][0],e[0][1]);for(var n=1;n<e.length;n++)r.lineTo(e[n][0],e[n][1]);r.stroke()}function p(e,n){var a=e.getPlotOffset();n.save(),n.translate(a.left,a.top),r.each(e.getData(),function(r,a){a.points.errorbars&&(a.points.xerr.show||a.points.yerr.show)&&i(e,n,a)}),n.restore()}function t(r){r.hooks.processRawData.push(e),r.hooks.draw.push(p)}var l={series:{points:{errorbars:null,xerr:{err:"x",show:null,asymmetric:null,upperCap:null,lowerCap:null,color:null,radius:null},yerr:{err:"y",show:null,asymmetric:null,upperCap:null,lowerCap:null,color:null,radius:null}}}};r.plot.plugins.push({init:t,options:l,name:"errorbars",version:"1.0"})}(jQuery);