
# Documentation
- Class name: `PerfectionStyler`
- Category: `ali1234/stylers`
- Output node: `False`

PerfectionStyler节点旨在通过应用一系列全面的风格调整来增强和美化图像生成提示。它专注于优化图像的各个方面，如相机设置、构图、光照和氛围，以达到更具美感和主题一致性的输出效果。

# Input types
## Required
- **`text_positive`**
    - 'text_positive'输入代表描述所需图像的初始正面提示。这个输入至关重要，因为它作为节点应用风格增强的基础，从主题、氛围和整体构图等方面影响最终输出。
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - 'text_negative'输入用于指定生成图像中不需要的元素或主题。它在细化输出方面发挥重要作用，通过防止某些方面出现，确保最终图像更贴近用户的设想。
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`camera`**
    - 'camera'输入允许用户指定与相机设置相关的偏好，如角度和焦点，以影响生成图像的视觉视角。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`composition`**
    - 此输入使用户能够定义图像的构图，包括主体和物体的排列，以创建平衡且引人入胜的视觉效果。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`depth`**
    - 'depth'输入有助于调整图像的感知深度，增强3D效果和元素之间的空间关系。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`environment`**
    - 用户可以指定环境设置，如室内或室外、天气条件和一天中的时间，以匹配图像所需的上下文。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`filter`**
    - 此输入允许应用视觉滤镜来改变图像的颜色、对比度和整体氛围。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`focus`**
    - 'focus'输入控制图像的焦点区域，突出特定主体或模糊背景以吸引注意力。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lighting`**
    - 用户可以指定光照条件，如光线的方向和强度，以增强图像的真实感和氛围。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`mood`**
    - 'mood'输入允许用户传达图像所需的情感基调或氛围，影响其主题方向。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`subject`**
    - 此输入指定图像的主要主体，如人物、物体或场景，以确保其符合用户的设想。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`theme`**
    - 'theme'输入使用户能够为图像定义特定主题或概念，指导其风格和构图方向。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`timeofday`**
    - 用户可以指定图像的一天中的时间，影响光照、阴影和整体氛围。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - 'log_prompt'输入是一个可选参数，用于启用转换过程的日志记录。它提供了初始提示如何被修改和风格化的见解，为节点操作提供透明度和理解。
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`

# Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - 修改后的'text_positive'输出反映了初始提示的增强和风格化版本，融合了节点进行的风格调整，以更好地捕捉所需的图像和主题。
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - 修改后的'text_negative'输出提供了更新后的不需要的元素或主题列表，在风格化过程中被精炼，以确保最终图像更准确地反映用户的偏好。
    - Python dtype: `str`


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
