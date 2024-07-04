
# Documentation
- Class name: VerbingStylerAdvanced
- Category: ali1234/stylers
- Output node: False

VerbingStylerAdvanced节点是一个高级文本提示词样式处理器，它利用多种样式选项来修改和增强文本属性以满足特定需求。该节点支持对文本进行全局和局部调整，能够根据用户选择的样式进行详细的自定义。

# Input types
## Required
- text_positive_g
    - 作为全局正面文本输入，形成根据所选选项进行样式修改的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 代表局部正面文本输入，允许在样式处理过程中进行更精细的控制和自定义。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 作为负面文本输入，可以根据样式选择对其进行处理，以与正面文本形成对比或互补。
    - Comfy dtype: STRING
    - Python dtype: str
- verbing
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 决定负面样式的应用范围，可以将调整定向到全局、局部或两者兼顾的文本方面。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 启用提示信息的日志记录，包括选择和样式化后的文本，对调试或审查很有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 全局样式化后的正面文本，反映了应用的样式选项。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 局部样式化后的正面文本，展示了详细样式调整的效果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 应用全局和局部样式后的组合正面文本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 全局样式化后的负面文本，根据样式选择进行了修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 局部样式化后的负面文本，展示了精确样式选择的影响。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 完全样式化后的负面文本，结合了全局和局部样式效果。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
