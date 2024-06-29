# SetRequestStateToComplete
## Documentation
- Class name: `SetRequestStateToComplete`
- Category: `Bmad/api`
- Output node: `True`

This node is designed to mark the state of a request as 'complete' within the request metadata file, effectively signaling the successful completion of a task.
## Input types
### Required
- **`resource_i`**
    - unknown
    - Comfy dtype: `TASK_DONE`
    - Python dtype: `unknown`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SetRequestStateToComplete:
    """
    Set request state to 'complete' in the request metadata file.
    """

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "resource_0": ("TASK_DONE",)
        },
        }

    RETURN_TYPES = ()
    FUNCTION = "update_outdata"
    CATEGORY = "Bmad/api"
    OUTPUT_NODE = True

    def update_outdata(self, **kwargs):
        # update request file
        CreateRequestMetadata.update_request_state("complete")

        # clear request_id
        CreateRequestMetadata.request_id = None

        # TODO
        # Validate received tasks with all the info in the outputs
        # if they do not match, add some additional info to inform something went wrong
        # then, update class description w/ this detail

        return ()

```
