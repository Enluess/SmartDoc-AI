from pydantic import BaseModel
from typing import Dict, List, Optional, Any

class SummaryRequest(BaseModel):
    pass  # Only used for OpenAPI docs, not used directly (upload is via FormData)

class SummaryResponse(BaseModel):
    topic: str
    date: Optional[str]
    parties: Optional[str]
    main_points: str
    risks: Optional[str]
    terms: Optional[str]
    evaluation: str
    raw_response: Optional[Any] = None  # For debugging or download