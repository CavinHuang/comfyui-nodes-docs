
# Documentation
- Class name: LightingStyler
- Category: ali1234/stylers
- Output node: False

LightingStyler节点能够动态地对输入的提示词应用光照调整，通过预定义的模板来增强或改变其视觉表现。它利用一系列光照样式来修改输入提示词的美学效果和氛围，旨在实现特定的光照效果。

# Input types
## Required
- text_positive
    - 正面文本输入代表初始提示词或图像描述，节点将对其应用光照样式进行调整。它在决定最终输出中起着关键作用，提供了将被风格化修改的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入作为正面输入的平衡，指定了在最终风格化提示词中需要避免的元素或主题。它确保输出符合所需的美学效果，排除不需要的特征。
    - Comfy dtype: STRING
    - Python dtype: str
- lighting
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- log_prompt
    - 未知
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown

# Output types
- text_positive
    - 风格化后的正面文本输出反映了对原始提示词应用光照样式的结果，展示了节点增强或改变输入视觉氛围和美学效果的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 风格化后的负面文本输出表明了原始负面输入如何根据应用的光照样式进行调整，确保最终输出与用户的美学偏好保持一致。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
