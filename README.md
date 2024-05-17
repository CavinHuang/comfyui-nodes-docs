# comfyUI Nodes Documentation

This is the documentation for the comfyUI every nodes.

![example1](examples/2.png)

## installation

- Open the cmd window in the plugin directory of ComfyUI, like "ComfyUI\custom_nodes"，type `git clone https://github.com/CavinHuang/comfyui-nodes-docs` or download the zip file and extracted, copy the resulting folder to ComfyUI\custom_ Nodes\

- Restart ComfyUI

## development

### fork the repo

- Fork the repo to your own github account
- Create a new branch for your changes and make the changes
- Create a pull request to the main repo

### add a new node docs

- Create a Markdown file named after the `node type` in the 'docs' folder, such as `CLIPMergeSimple.md`
- Add the following structure to the file, please refer to specific examples(CLIPMergeSimple.md)[docs/CLIPMergeSimple.md] for details.:

<pre><code>
# Documentation
- Class name: Node name
- Category: Node category
- Output node: False
- Repo Ref: https://github.com/xxxx

Description of nodes

# Input types

Node input types

# Output types

Node output types

# Usage tips
- Infra type: GPU

# Source code

Node source code
</code></pre>