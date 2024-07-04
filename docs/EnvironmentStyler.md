
# Documentation
- Class name: EnvironmentStyler
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

EnvironmentStyler节点根据环境方面动态地对文本提示进行风格修饰，利用一系列预定义的模板。它允许根据特定的环境设置或主题定制文本提示，从而增强输出的上下文相关性和创造性。

# Input types
## Required
- text_positive
    - 要进行风格化的正面文本提示。它作为基础内容，将根据所选的环境风格进行修改，影响输出的主题方向。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行风格化的负面文本提示。这个输入与正面提示配合使用，允许基于环境线索进行细微调整，以完善整体主题表达。
    - Comfy dtype: STRING
    - Python dtype: str
- environment
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- log_prompt
    - 一个布尔标志，启用时会记录输入提示及其风格化版本，用于调试或分析目的。它有助于理解环境风格化如何影响文本。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 正面文本提示的风格化版本，反映了应用的环境主题。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本提示的风格化版本，调整以在环境背景下补充正面提示。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
