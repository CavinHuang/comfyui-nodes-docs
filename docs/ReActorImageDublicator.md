
# Documentation
- Class name: ReActorImageDublicator
- Category: 🌌 ReActor
- Output node: False

ReActorImageDublicator节点是ReActor套件的一部分，旨在创建图像的副本，可能以列表格式呈现。这一功能对于需要同一图像的多个实例进行处理或分析的操作至关重要，从而增强图像操作和增强任务中的工作流程。

# Input types
## Required
- image
    - 指定要复制的原始图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- count
    - 确定要从原始图像创建的副本数量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGES
    - 返回基于指定数量的复制图像列表。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
