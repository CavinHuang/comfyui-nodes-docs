# comfyUI Nodes Documentation

----

中文文档｜ [English Document](README.md)

这是一个用于显示每个comfyui节点文档的插件。


![example1](examples/2.png)

## 安装

### comfyUI Manager

在comfyUI管理器中搜索`comfyui-nodes-docs`并安装。

### 自定义安装

- 在ComfyUI的插件目录中打开cmd窗口，例如"ComfyUI\custom_nodes"，输入`git clone https://github.com/CavinHuang/comfyui-nodes-docs` 或下载zip文件并解压，将生成的文件夹复制到ComfyUI\custom_ Nodes\

- 重新启动ComfyUI

## 参与共建

### 两个方面：

- 参与插件的维护，修复问题，提升使用体验，优化代码

- 参与节点文档的建设，新增还未收录的节点文档，修改已有节点文档中不正确的地方，或者因为插件升级导致的文档滞后问题。

### 参与方式如下：

- Fork一份代码到你的github中

- 创建一个新的分支用于修改你的变化，在你的仓库中完成你所有的变化，并且提交。

- 创建一个Pull Request，提交你的变化分支合并申请到main分支

- 通过审核后，将会发布你的代码到最新的main分支，公众将可以使用你提交的特性。

### 添加新的节点文档

- 在`docs`文件夹中创建一个以`节点类型`命名的Markdown文件，例如`CLIPMergeSimple.md`

- 在文件中添加以下结构，请参考具体示例[CLIPMergeSimple.md](docs/CLIPMergeSimple.md)：

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