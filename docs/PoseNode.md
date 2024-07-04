
# Documentation
- Class name: PoseNode
- Category: AlekPet Nodes/image
- Output node: False

PoseNode旨在处理图像以生成其姿势表示。它利用图像处理技术将图像转换为适合姿势分析的格式，抽象化了姿势检测任务中图像操作和转换的复杂性。

# Input types
## Required
- image
    - 'image'参数指定要进行姿势检测的图像文件。它在节点操作中起着至关重要的作用，作为导出姿势信息的主要输入源。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出是处理后图像的张量表示，适用于姿势检测任务中的进一步分析或可视化。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
