
# Documentation
- Class name: SubjectStylerAdvanced
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SubjectStylerAdvanced节点旨在为文本提示应用高级样式选项，基于一系列与主题相关的样式。它允许通过各种特定主题的模板来自定义正面和负面提示，从而增强用于创意和描述性目的的样式化文本生成。

# Input types
## Required
- text_positive_g
    - 要设置样式的全局正面文本提示。它作为应用特定主题样式转换的基础内容，影响整体主题呈现。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 要设置样式的局部正面文本提示。此参数允许对正面提示的特定部分应用更精细的样式控制，有助于产生更细致和详细的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要设置样式的负面文本提示。用于指定应与正面提示形成对比或从中排除的内容，指导样式过程避免某些主题或元素。
    - Comfy dtype: STRING
    - Python dtype: str
- subject
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 指定如何应用负面提示样式：可以同时应用于全局和局部正面提示，仅应用于全局提示，或仅应用于局部提示。这种选择允许根据所需结果进行有针对性的样式调整。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- log_prompt
    - 一个布尔标志，指示是否记录输入和样式化后的提示，用于调试或审查目的。启用此选项可以提供样式过程和所选模板效果的透明度。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 样式化后的全局正面文本提示，反映了应用的特定主题样式选项。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 样式化后的局部正面文本提示，展示了对提示特定部分的细致样式效果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 附加的样式化正面文本提示，提供另一层创意样式输出。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 样式化后的全局负面文本提示，指示负面主题或元素如何被艺术地整合或排除。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 样式化后的局部负面文本提示，提供了对提示特定部分中负面元素详细排除或改变的洞察。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 完全样式化的负面文本提示，展示了特定主题样式的全面应用，以避免或对比某些主题。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
