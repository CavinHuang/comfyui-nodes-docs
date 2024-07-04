
# Documentation
- Class name: ReActorMakeFaceModelBatch
- Category: 🌌 ReActor
- Output node: False

ReActorMakeFaceModelBatch节点旨在ReActor框架内批量处理面部模型。它可以同时创建或处理多个面部模型，简化了需要处理多个面部模型的工作流程，如批量人脸分析、交换或修复等场景。

# Input types
## Required
- face_model1
    - 处理所需的主要面部模型。它作为批处理操作的初始输入。其存在至关重要，因为它通过确定批处理操作的起点来设置基准，从而影响执行过程。
    - Comfy dtype: FACE_MODEL
    - Python dtype: torch.Tensor

## Optional
- face_model2
    - 可选的额外面部模型，用于处理更复杂或多样化的批处理操作。包含此模型可以增加批处理过程的多样性，通过引入正在处理的模型的可变性来影响节点的执行。
    - Comfy dtype: FACE_MODEL
    - Python dtype: torch.Tensor
- face_model3
    - 可选的额外面部模型，允许在单个批处理操作中包含多个模型。这增加了批处理的复杂性，可能会影响执行过程，因为节点需要处理更广泛的模型特征。
    - Comfy dtype: FACE_MODEL
    - Python dtype: torch.Tensor
- face_model4
    - 可选的额外面部模型，进一步扩展了使用多个模型进行批处理操作的能力。这种扩展可能会通过增加处理的数据量来影响节点的执行，从而影响性能和结果。
    - Comfy dtype: FACE_MODEL
    - Python dtype: torch.Tensor
- face_model5
    - 可选的额外面部模型，增加批处理操作的灵活性和范围。它的包含可能会通过扩大可能操作的范围来影响节点的执行，从而允许更定制化的批处理。
    - Comfy dtype: FACE_MODEL
    - Python dtype: torch.Tensor
- face_model6
    - 可选的额外面部模型，增强了在批处理中处理更多模型的能力。这可能会显著影响节点的执行，通过扩大处理需求和潜在的批处理操作复杂性。
    - Comfy dtype: FACE_MODEL
    - Python dtype: torch.Tensor
- face_model7
    - 可选的额外面部模型，允许在批处理操作中包含更广泛的模型。这可能会改变节点的执行，通过引入更多处理模型的多样性，可能需要不同的处理或处理策略。
    - Comfy dtype: FACE_MODEL
    - Python dtype: torch.Tensor
- face_model8
    - 可选的额外面部模型，使批处理能够更广泛地包含模型。这扩大了节点的操作范围，通过可能增加每个模型所需的处理多样性来影响其执行。
    - Comfy dtype: FACE_MODEL
    - Python dtype: torch.Tensor
- face_model9
    - 可选的额外面部模型，促进在单个批处理中包含广泛的模型。这种包含可能会通过将更多变量添加到批处理过程中来使节点的执行变得复杂，影响批处理的管理和执行方式。
    - Comfy dtype: FACE_MODEL
    - Python dtype: torch.Tensor
- face_model10
    - 可选的额外面部模型，最大化了在批处理操作中包含众多模型的能力。这种最大化通过推动节点在单个批处理中可以处理的极限来影响节点的执行，影响性能和操作的复杂性。
    - Comfy dtype: FACE_MODEL
    - Python dtype: torch.Tensor

# Output types
- FACE_MODELS
    - 输出是批处理中处理的面部模型集合，可以在各种场景中进行进一步使用或分析。
    - Comfy dtype: FACE_MODEL
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
