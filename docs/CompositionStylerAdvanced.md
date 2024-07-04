
# Documentation
- Class name: CompositionStylerAdvanced
- Category: ali1234/stylers
- Output node: False

CompositionStylerAdvanced节点通过动态继承SDXLPromptStylerAdvanced类，为基于构图的文本提示词提供高级样式功能。它利用预定义的菜单集来对正面和负面文本提示词应用特定的风格转换，从而增强其主题和美学品质。

# Input types
## Required
- text_positive_g
    - 需要进行样式处理的全局正面文本提示词，为样式处理过程提供更广泛的上下文。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 需要进行样式处理的局部正面文本提示词，专注于构图的更具体或详细的方面。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- composition
    - 从构图菜单中选择的选项，用于应用特定的风格转换。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- negative_prompt_to
    - 控制负面样式应用的位置，可选择针对全局、局部或两者同时应用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 布尔标志，用于启用或禁用提示词样式处理过程的日志记录。这有助于调试和理解所应用的转换。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 经过样式处理的全局正面文本提示词，根据选定的构图风格进行转换。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 经过样式处理的局部正面文本提示词，反映了基于构图的详细风格增强。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 合并后的经过样式处理的正面文本提示词，整合了全局和局部的转换。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 经过样式处理的全局负面文本提示词，根据负面样式方向进行修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 经过样式处理的局部负面文本提示词，展示了具体的负面风格变化。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 合并后的经过样式处理的负面文本提示词，包含了全局和局部的负面转换。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
