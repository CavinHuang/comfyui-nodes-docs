
# Documentation
- Class name: LutsStylerAdvanced
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LutsStylerAdvanced节点通过动态子类化SDXLPromptStylerAdvanced来为文本提示提供高级样式设置功能。它利用一系列预定义的样式，每种样式都与独特的菜单选项相关联，根据用户的选择来修改和增强文本输入。该节点旨在提供更复杂的文本提示样式设置，允许进行超出基本文本转换的精细调整和定制。

# Input types
## Required
- text_positive_g
    - 要进行样式设置的全局正面文本输入，代表要增强的更广泛的上下文或主题。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 要进行样式设置的局部正面文本输入，聚焦于更广泛上下文中的特定细节或元素。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式设置的负面文本输入，用于用户希望与正面输入形成对比的文本。
    - Comfy dtype: STRING
    - Python dtype: str
- LUTs
    - 用于设置文本提示样式的查找表（LUTs）选择，代表要应用的特定样式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list[str]
- negative_prompt_to
    - 指定负面样式设置的目标，允许在全局、局部或两者之间进行选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，用于启用或禁用提示样式设置过程的日志记录，提供对所做选择及其影响的洞察。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 全局正面文本输入的样式设置版本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 局部正面文本输入的样式设置版本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 全局和局部正面文本输入的组合样式设置版本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 全局负面文本输入的样式设置版本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 局部负面文本输入的样式设置版本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 根据所选样式设置选项转换的负面文本输入的组合样式设置版本。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
