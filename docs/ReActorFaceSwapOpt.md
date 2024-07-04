
# Documentation
- Class name: ReActorFaceSwapOpt
- Category: 🌌 ReActor
- Output node: False

ReActorFaceSwapOpt 节点在 ReActor 框架内提供优化的换脸功能，为用户提供高级选项以微调换脸过程。它通过引入额外的参数和优化，扩展了基本换脸功能，从而提高输出的质量和灵活性。

# Input types
## Required
- enabled
    - 决定是否启用换脸操作，允许用户根据需求切换该功能。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- input_image
    - 换脸操作的主要图像输入，作为面部替换的目标。
    - Comfy dtype: IMAGE
    - Python dtype: Image
- swap_model
    - 指定用于换脸的模型，允许从预定义的可用模型列表中进行选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list[str]
- facedetection
    - 定义要使用的人脸检测算法，提供多个选项以最适合不同的图像条件。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list[str]
- face_restore_model
    - 选择用于恢复换脸后面部细节的模型，提高换脸后的整体质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list[str]
- face_restore_visibility
    - 调整恢复的面部细节的可见度，提供对原始面部特征和恢复面部特征之间混合的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- codeformer_weight
    - 控制 CodeFormer 模型在面部恢复过程中的影响，平衡细节增强和自然度。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- source_image
    - 换脸的可选二次图像输入，作为要换入主图像的面部来源。
    - Comfy dtype: IMAGE
    - Python dtype: Image
- face_model
    - 可选指定用于换脸的面部模型，提供换脸过程的进一步自定义。
    - Comfy dtype: FACE_MODEL
    - Python dtype: FACE_MODEL
- options
    - 提供换脸操作的额外配置选项，允许更详细的自定义。
    - Comfy dtype: OPTIONS
    - Python dtype: OPTIONS

# Output types
- image
    - 换脸操作后的输出图像，包含集成到原始图像中的换脸结果。
    - Comfy dtype: IMAGE
    - Python dtype: Image
- face_model
    - 输出换脸过程中使用的面部模型，可用于进一步的操作或分析。
    - Comfy dtype: FACE_MODEL
    - Python dtype: FACE_MODEL


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
