
# Documentation
- Class name: AzazealStylesStylerAdvanced
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AzazealStylesStylerAdvanced节点旨在根据从Azazeal样式菜单中选择的样式对文本提示进行高级样式设置。它通过对文本输入进行风格化修改，以适应特定的美学或主题偏好，从而增强文本输入。

# Input types
## Required
- text_positive_g
    - 待样式化的全局正面文本提示。它作为应用全局风格转换的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 待样式化的局部正面文本提示。它用于应用局部风格调整，补充全局样式设置。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 待样式化的负面文本提示。此输入经过修改以反映所选样式，其方式与正面提示形成对比或否定。
    - Comfy dtype: STRING
    - Python dtype: str
- Azazeal Styles
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 指定负面样式应用的范围，允许对全局、局部或两种类型的提示进行有针对性的调整。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- log_prompt
    - 一个布尔标志，启用时会记录输入和输出提示以及所选样式，用于调试或审查目的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 经过样式化处理的全局正面文本提示，反映了应用的Azazeal样式。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 经过样式化处理的局部正面文本提示，展示了局部风格增强。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 综合性的样式化正面文本提示，整合了全局和局部的风格修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 经过样式化处理的全局负面文本提示，经过改变以与样式化的正面提示形成对比。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 经过样式化处理的局部负面文本提示，为正面样式提供了细微的对比。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 全面的样式化负面文本提示，包含了全局和局部的风格对比。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
