
# Documentation
- Class name: Camera_AnglesStylerAdvanced
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Camera_AnglesStylerAdvanced节点旨在通过调整相机角度来操控和增强图像，利用3D几何和透视变换技术。该节点应用复杂算法来模拟相机视点的仰角和方位角变化，以实现更具动态感或美学吸引力的构图。

# Input types
## Required
- text_positive_g
    - 指定需要在生成文本中强调的积极方面，引导生成过程朝向有利的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 定义需要在文本中突出的局部积极属性，聚焦于特定细节或元素。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 指出在文本生成中需要最小化或避免的消极方面，旨在避免不理想的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- camera_angles
    - 控制相机角度的模拟，包括仰角和方位角，用于调整生成图像的透视效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- negative_prompt_to
    - 针对特定的负面提示进行转换，旨在将其转化为更积极或中性的语境。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 记录用于生成文本的提示，有助于追踪和优化生成过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: str

# Output types
- text_positive_g
    - 生成全局积极的文本，反映变换后的整体积极结果。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- text_positive_l
    - 产生局部积极的文本，突出特定的积极细节或元素。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- text_positive
    - 输出受指定提示和相机角度调整积极影响的文本。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- text_negative_g
    - 生成全局消极的文本，可作为积极输出的对比或控制。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- text_negative_l
    - 产生局部消极的文本，聚焦于特定的消极细节或元素，用于对比或控制目的。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- text_negative
    - 输出保持消极影响的文本，作为比较的基准或控制。
    - Comfy dtype: STRING
    - Python dtype: List[str]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
