
# Documentation
- Class name: FocusStyler
- Category: ali1234/stylers
- Output node: False

FocusStyler是一个专门设计用于根据预定义模板对文本提示应用特定样式效果的节点，旨在增强其描述性质以生成具有风格化的图像。它根据选定的样式选项动态调整输入提示，目标是根据焦点主题优化视觉输出。

# Input types
## Required
- text_positive
    - 要进行样式化处理的正面文本提示，作为生成风格化描述的主要输入。对其进行修改是实现视觉输出中所需主题焦点的核心。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式化处理的负面文本提示，用于否定或平衡图像生成的某些方面。修改这个提示有助于微调生成图像的焦点。
    - Comfy dtype: STRING
    - Python dtype: str
- focus
    - 指定要应用于文本提示的样式焦点，引导样式效果的主题方向。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，指示是否记录输入和输出提示以进行调试或分析。启用此选项可以洞察样式如何影响提示。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 经过样式化处理的正面文本提示，反映了应用的焦点主题，用于指导图像生成过程。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 经过样式化处理的负面文本提示，经过调整以配合焦点主题，用于否定不需要的元素。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
