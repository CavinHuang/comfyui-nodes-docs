
# Documentation
- Class name: PrepositionStyler
- Category: ali1234/stylers
- Output node: False

PrepositionStyler节点根据预定义的模板和用户选择动态生成文本提示的样式选项。它通过根据所选选项应用样式修改来增强文本提示，旨在优化提示以实现更有针对性和更有效的生成任务。

# Input types
## Required
- text_positive
    - 要进行样式处理的正面文本提示。这个输入至关重要，因为它作为将通过样式处理过程增强的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式处理的负面文本提示。这个输入通过提供在生成过程中应避免或抵消的内容来补充正面提示。
    - Comfy dtype: STRING
    - Python dtype: str
- preposition
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- log_prompt
    - 一个布尔标志，指示是否记录输入提示及其样式化版本以进行调试或分析。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 正面文本提示的样式化版本，反映了应用的样式修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本提示的样式化版本，反映了应用的样式修改。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
