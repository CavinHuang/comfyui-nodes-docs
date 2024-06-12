---
tags:
- Face
- ReActorFace
---

# Make Face Model Batch 🌌 ReActor
## Documentation
- Class name: `ReActorMakeFaceModelBatch`
- Category: `🌌 ReActor`
- Output node: `False`

The `ReActorMakeFaceModelBatch` node is designed for batch processing of face models within the ReActor framework. It facilitates the creation or manipulation of multiple face models simultaneously, streamlining workflows that require handling several face models, such as in batch face analysis, swapping, or restoration scenarios.
## Input types
### Required
- **`face_model1`**
    - The primary face model required for processing. It serves as the initial input for batch operations. Its presence is crucial as it sets the baseline for the batch process, influencing the execution by determining the starting point of the batch operation.
    - Comfy dtype: `FACE_MODEL`
    - Python dtype: `torch.Tensor`
### Optional
- **`face_model2`**
    - An optional additional face model for processing, allowing for more complex or varied batch operations. Including this model can diversify the batch process, affecting the node's execution by introducing variability in the models being processed.
    - Comfy dtype: `FACE_MODEL`
    - Python dtype: `torch.Tensor`
- **`face_model3`**
    - An optional additional face model for processing, enabling the inclusion of multiple models in a single batch operation. This increases the complexity of the batch, potentially affecting the execution by requiring the node to handle a wider range of model characteristics.
    - Comfy dtype: `FACE_MODEL`
    - Python dtype: `torch.Tensor`
- **`face_model4`**
    - An optional additional face model for processing, further expanding the capacity for batch operations with multiple models. This expansion can influence the node's execution by increasing the volume of data processed, impacting performance and outcomes.
    - Comfy dtype: `FACE_MODEL`
    - Python dtype: `torch.Tensor`
- **`face_model5`**
    - An optional additional face model for processing, increasing the flexibility and scope of batch operations. Its inclusion can affect the node's execution by broadening the range of possible operations, allowing for more tailored batch processing.
    - Comfy dtype: `FACE_MODEL`
    - Python dtype: `torch.Tensor`
- **`face_model6`**
    - An optional additional face model for processing, enhancing the ability to handle a larger number of models in batch. This can significantly affect the node's execution by scaling the processing requirements and potentially the complexity of the batch operation.
    - Comfy dtype: `FACE_MODEL`
    - Python dtype: `torch.Tensor`
- **`face_model7`**
    - An optional additional face model for processing, allowing for an extended range of models to be included in batch operations. This can alter the node's execution by introducing more diversity in the models processed, which may require different handling or processing strategies.
    - Comfy dtype: `FACE_MODEL`
    - Python dtype: `torch.Tensor`
- **`face_model8`**
    - An optional additional face model for processing, enabling a broader inclusion of models for batch processing. This broadens the operational scope of the node, affecting its execution by potentially increasing the variety of processing needed for each model.
    - Comfy dtype: `FACE_MODEL`
    - Python dtype: `torch.Tensor`
- **`face_model9`**
    - An optional additional face model for processing, facilitating the inclusion of a wide array of models in a single batch. This inclusion can complicate the node's execution by adding more variables into the batch process, affecting how the batch is managed and executed.
    - Comfy dtype: `FACE_MODEL`
    - Python dtype: `torch.Tensor`
- **`face_model10`**
    - An optional additional face model for processing, maximizing the capacity for including numerous models in batch operations. This maximization affects the node's execution by pushing the limits of what the node can process in a single batch, impacting both performance and the complexity of the operation.
    - Comfy dtype: `FACE_MODEL`
    - Python dtype: `torch.Tensor`
## Output types
- **`FACE_MODELS`**
    - Comfy dtype: `FACE_MODEL`
    - The output is a collection of face models processed in the batch, ready for further use or analysis in various scenarios.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
