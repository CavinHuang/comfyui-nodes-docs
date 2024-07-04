
# Documentation
- Class name: ArtistStylerAdvanced
- Category: ali1234/stylers
- Output node: False

ArtistStylerAdvanced节点是一个动态子类，继承自SDXLPromptStylerAdvanced，用于根据特定艺术家的风格对文本提示进行高级样式化处理。它利用全面的风格模板数据集，将输入的提示转换为具有艺术风格的版本，从而在文本生成任务中增强创造力和特异性。

# Input types
## Required
- text_positive_g
    - 要进行样式化处理的全局正面文本提示，作为艺术转换的基础元素。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 要进行样式化处理的局部正面文本提示，允许进行更详细和微妙的艺术转换。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式化处理的负面文本提示，为对比或否定性的艺术转换提供基础。
    - Comfy dtype: STRING
    - Python dtype: str
- artist
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 指定负面样式转换的范围，允许在全局、局部或两者之间进行选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，用于启用或禁用提示样式化过程的日志记录，提供对样式化决策和结果的洞察。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 最终样式化处理后的全局正面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 最终样式化处理后的局部正面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 最终样式化处理后的综合正面文本提示，包含全局和局部艺术转换。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 最终样式化处理后的全局负面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 最终样式化处理后的局部负面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 最终样式化处理后的综合负面文本提示，反映全局和局部艺术细微差别。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
