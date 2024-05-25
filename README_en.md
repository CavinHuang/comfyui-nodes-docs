# comfyUI Nodes Documentation

----

[中文文档](README.md) ｜ English Document

This is a plugin for displaying documentation for each comfyui node.

![example1](examples/2.png)

## Installation

### comfyUI Manager

search `comfyui-nodes-docs` in the comfyUI manager and install it.

### Custom Installation

- Open the cmd window in the plugin directory of ComfyUI, like "ComfyUI\custom_nodes"，type `git clone https://github.com/CavinHuang/comfyui-nodes-docs` or download the zip file and extracted, copy the resulting folder to ComfyUI\custom_ Nodes\

- Restart ComfyUI

## [Node Lists](nodesList.md)

## Development

### Two aspects:

- Participate in the maintenance of the plugin, fix issues, improve the user experience, optimize the code

- Participate in the construction of node documentation, add node documentation that has not yet been included, modify incorrect parts in existing node documentation, or document lagging issues caused by plugin upgrades.

### Participation method:

- Fork the repo to your own github account
- Create a new branch for your changes and make the changes
- Create a pull request to the main repo
- After review, your changes will be merged into the main branch and released to the public.

### Add a new node docs

- Create a Markdown file named after the `node type` in the 'docs' folder, such as `CLIPMergeSimple.md`
- Add the following structure to the file, please refer to specific examples[CLIPMergeSimple.md](docs/CLIPMergeSimple.md) for details.:

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

