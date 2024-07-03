
# Documentation
- Class name: ReActorOptions
- Category: 🌌 ReActor
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ReActorOptions节点为ReActor框架内的换脸操作提供了配置各种选项的机制。它允许自定义人脸检测、性别检测和日志级别，以根据特定需求定制换脸过程。

# Input types
## Required
- input_faces_order
    - 指定输入人脸的处理顺序，提供了多种策略，如左右顺序、上下顺序或基于大小的顺序。这影响了人脸选择和操作的优先级。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- input_faces_index
    - 确定要在输入图像中处理的人脸索引，使得能够针对特定人脸进行操作。
    - Comfy dtype: STRING
    - Python dtype: str
- detect_gender_input
    - 启用输入人脸的性别检测，允许进行基于性别的处理或筛选。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- source_faces_order
    - 定义源人脸的处理顺序，类似于input_faces_order，但应用于源图像。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- source_faces_index
    - 指定要使用的源图像中的人脸索引，实现对源人脸选择的精确控制。
    - Comfy dtype: STRING
    - Python dtype: str
- detect_gender_source
    - 激活源人脸的性别检测，可用于应用基于性别的调整或选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- console_log_level
    - 设置控制台日志的详细程度，允许用户控制操作期间生成的日志输出量。
    - Comfy dtype: COMBO[INT]
    - Python dtype: List[int]

# Output types
- options
    - 输出用于换脸操作的配置选项，包括人脸和性别检测偏好等设置。
    - Comfy dtype: OPTIONS
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
