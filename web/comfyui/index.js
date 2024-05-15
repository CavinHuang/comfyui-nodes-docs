import { app } from "../../scripts/app.js";

console.log('app', app)
const drawDocIcon = function(node, orig, restArgs) {
  debugger
  let ctx = restArgs[0];
	const r = orig?.apply?.(node, restArgs);

	if (!node.flags.collapsed && node.constructor.title_mode != LiteGraph.NO_TITLE) {
    const docIcon = '📄';
    let fgColor = "white";

    ctx.save();

    ctx.font = "16px sans-serif";
    const sz = ctx.measureText(docIcon);
    ctx.beginPath();
    ctx.fillStyle = fgColor;
    ctx.fillText(docIcon, node.size[0] - sz.width - 6, -LiteGraph.NODE_TITLE_HEIGHT + 22);
    ctx.restore();

    if (node.has_errors) {
      ctx.save();
      ctx.font = "bold 14px sans-serif";
      const sz2 = ctx.measureText(node.type);
      ctx.fillStyle = 'white';
      ctx.fillText(node.type, node.size[0] / 2 - sz2.width / 2, node.size[1] / 2);
      ctx.restore();
    }
  }
  return r
}

app.registerExtension({
  name: 'Leo.NodeDocs',
  setup() {

    const a = app.canvas.processMouseDown
    console.log('🚀 ~ setup ~ a:', a)

    app.canvas.processMouseDown = function(e) {
      console.log('processMouseDown', e)
      a.apply(app.canvas, arguments)
    }

  },
  nodeCreated: function(node, app) {
    if(!node.doc_enabled) {
      let orig = node.onDrawForeground;
        if(!orig)
          orig = node.__proto__.onDrawForeground;
      node.onDrawForeground = function (ctx) {
        drawDocIcon(node, orig, arguments)
      };
      node.doc_enabled = true;
      console.log('=======', node)
    }
  },
  loadedGraphNode(node, app) {
		if(!node.doc_enabled) {
			const orig = node.onDrawForeground;
			node.onDrawForeground = function (ctx) { drawDocIcon(node, orig, arguments) };
		}
    const oDb = node.onMouseDown
    node.onMouseDown = function(e) {
      oDb?.apply(node, arguments)
      console.log('onMouseDown', e)
    }
	},
});