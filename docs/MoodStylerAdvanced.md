
# Documentation
- Class name: MoodStylerAdvanced
- Category: ali1234/stylers
- Output node: False

MoodStylerAdvanced节点旨在根据选定的情绪来增强和改变文本提示，为生成或修改文本提供高级定制选项，以反映特定的情绪属性。它利用全面的风格数据集对正面和负面提示进行细微调整，使用户能够精确地调整生成内容的情绪。

# Input types
## Required
- text_positive_g
    - 要进行风格化的全局正面文本，作为基于情绪增强的基础。它在定义内容的整体积极基调中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 要进行风格化的局部正面文本，允许在比全局正面文本更具体的层面上进行细粒度的情绪调整。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行风格化的负面文本，它会被转换以反映所选的情绪，以一种与正面文本形成对比的方式。
    - Comfy dtype: STRING
    - Python dtype: str
- mood
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 指定负面文本的目标情绪，指导转换过程以达到所需的情绪对比。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，启用时会记录输入和输出提示以及所选的情绪风格，用于调试或审查目的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 经过情绪风格化后的全局正面文本，反映了所选的情绪增强。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 经过情绪风格化后的局部正面文本，展示了应用的细粒度情绪调整。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 风格化正面文本的组合版本，包含了全局和局部的增强。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 经过情绪风格化后的全局负面文本，通过反映不同或相反的情绪与正面文本形成对比。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 经过情绪风格化后的局部负面文本，在更具体的层面上提供详细的情绪对比。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 风格化负面文本的组合版本，包含了全局和局部的基于情绪的转换。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
