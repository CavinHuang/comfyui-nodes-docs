
# Documentation
- Class name: MilehighStylerAdvanced
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/ali1234/comfyui_ali1234

MilehighStylerAdvanced节点通过动态继承基础样式器类来提供高级文本提示样式选项。它利用全面的样式模板数据集对文本输入应用特定的美学或主题修改，从而增强其描述性或改变其情绪和语调。

# Input types
## Required
- text_positive_g
    - 全局正向文本提示，用于通过节点的样式功能进行增强或修改。它作为应用全局样式主题的基础元素。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 局部正向文本提示，通过允许更详细或特定的样式调整来补充全局提示。它能够对样式过程进行更精细的控制。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负向文本提示，节点用它来应用反向样式效果，旨在消除或减弱文本的某些方面。这个输入对于在样式化输出中创建对比或焦点至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- milehigh
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 指定负向样式应用的范围，可以影响全局、局部或两者兼顾的文本提示。这个选择影响了负向样式的整合方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 布尔标志，用于启用或禁用提示样式过程的日志记录。启用日志记录可以提供关于所做选择和结果样式提示的洞察，提供透明度并帮助评估样式效果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 应用节点高级样式选项后，全局正向文本提示的增强版本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 局部正向文本提示的修改版本，反映了所做的特定样式调整。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- text_negative_g
    - 全局负向文本提示的修改版本，展示了在全局范围内应用反向样式的效果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 局部负向文本提示的修改版本，展示了在局部范围内应用反向样式的效果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负向文本提示的组合样式版本，反映了整体反向样式效果。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
