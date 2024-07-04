
# Documentation
- Class name: Banana_StylesStylerAdvanced
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/ali1234/comfyui_stylers

Banana_StylesStylerAdvanced 节点专门用于根据"香蕉风格"相关的一系列样式选项来对文本提示进行高级样式处理。它从预定义的数据集中动态生成样式选项，使用户能够用与"香蕉风格"相关的特定美学或主题特征来增强或修改文本提示。

# Input types
## Required
- text_positive_g
    - 需要进行样式处理的文本提示的全局正面部分，作为样式处理的基础内容之一。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 需要进行样式处理的文本提示的局部正面部分，与全局正面文本互补，用于细化样式处理过程。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 需要进行样式处理的文本提示的负面部分，与正面文本配合使用，确保"香蕉风格"特征的平衡应用。
    - Comfy dtype: STRING
    - Python dtype: str
- banana_styles
    - 指定要应用的特定"香蕉风格"，允许根据用户选择自定义样式处理过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- negative_prompt_to
    - 指定负面样式应用的范围，可以是全局、局部或两者兼有。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 布尔标志，启用时会记录输入和输出提示以及所选的"香蕉风格"，用于调试或复查。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 经过"香蕉风格"特征增强的全局正面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 同样经过"香蕉风格"特征增强的局部正面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 结合了全局和局部增强的完整样式化正面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 反映"香蕉风格"主题调整的全局负面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 同样反映"香蕉风格"主题调整的局部负面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 结合了全局和局部调整的完整样式化负面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
