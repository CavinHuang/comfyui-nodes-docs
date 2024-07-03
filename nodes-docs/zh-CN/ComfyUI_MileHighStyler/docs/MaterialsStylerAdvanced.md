
# Documentation
- Class name: MaterialsStylerAdvanced
- Category: ali1234/stylers
- Output node: False

MaterialsStylerAdvanced节点旨在为文本提示应用高级样式选项，重点关注材料方面。它根据选定的材料相关风格动态调整文本，通过更细致和具体的材料特征描述来增强提示的描述质量。

# Input types
## Required
- text_positive_g
    - 要进行样式化的文本的全局正面方面，有助于整体主题方向的确定。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 文本的局部正面方面，在全局背景下提供详细的增强。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式化的文本的负面方面。它用于平衡或对比正面方面，有助于产生更细致和全面的样式化输出。
    - Comfy dtype: STRING
    - Python dtype: str
- materials
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 决定如何应用负面样式，可以是全局、局部或两者兼有，影响样式化的结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，启用时会记录样式化过程中做出的选择以及原始文本和样式化后的文本，有助于调试和改进。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - Comfy dtype: STRING
    - 全局正面文本的样式化版本，反映了所选的材料特征。
    - Python dtype: str
- text_positive_l
    - Comfy dtype: STRING
    - 局部正面文本的样式化版本，根据选定的材料细节进行详细描述。
    - Python dtype: str
- text_positive
    - Comfy dtype: STRING
    - 全局和局部正面文本的组合样式化版本，提供全面的增强效果。
    - Python dtype: str
- text_negative_g
    - Comfy dtype: STRING
    - 全局负面文本的样式化版本，根据样式偏好进行调整。
    - Python dtype: str
- text_negative_l
    - Comfy dtype: STRING
    - 局部负面文本的样式化版本，为正面方面提供详细的对比。
    - Python dtype: str
- text_negative
    - Comfy dtype: STRING
    - 全局和局部负面文本的组合样式化版本，有助于产生平衡和细致的输出。
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
