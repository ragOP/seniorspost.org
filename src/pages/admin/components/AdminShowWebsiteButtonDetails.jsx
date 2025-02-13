// import { Box, Stack, Typography } from "@mui/material";
// import { motion } from "framer-motion";

// const AdminShowWebsiteButtonDetails = ({
//     selectedWebsite,
// }) => {
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             style={{ width: "100%" }}
//         >
//             <Box
//                 sx={{
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     backgroundColor: "rgba(255, 255, 255, 0.1)",
//                 }}
//             >
//                 <Typography
//                     variant="h6"
//                     gutterBottom
//                     component={motion.div}
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     sx={{ color: "rgb(245, 47, 90)" }}
//                 >
//                     Selected Website Details
//                 </Typography>
//                 <Stack spacing={2}>
//                     {selectedWebsite && (
//                         <motion.div
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.5, delay: 0.2 }}
//                         >
//                             <Typography
//                                 variant="subtitle1"
//                                 fontWeight="bold"
//                                 sx={{ color: "rgb(249, 61, 102)" }}
//                             >
//                                 Website Details:
//                             </Typography>
//                             <Typography variant="body2">
//                                 <strong>Website ID:</strong> {selectedWebsite.websiteId}
//                             </Typography>

//                             <Typography variant="body2">
//                                 <strong>Visited:</strong> {selectedWebsite.totalVisits}
//                             </Typography>
//                             {selectedWebsite.websiteName && (
//                                 <Typography variant="body2">
//                                     <strong>Name:</strong> {selectedWebsite.websiteName}
//                                 </Typography>
//                             )}
//                             <Typography variant="body2">
//                                 <strong>Converstion Rate: </strong>
//                                 {selectedWebsite.conversionPercentage || 0}
//                             </Typography>
//                             {selectedWebsite.buttonClicks && (
//                                 <Box>
//                                     <Typography
//                                         variant="subtitle1"
//                                         fontWeight="bold"
//                                         sx={{ color: "rgb(249, 61, 102)" }}
//                                     >
//                                         Button Clicks:
//                                     </Typography>
//                                     {Object.entries(selectedWebsite.buttonClicks).map(
//                                         ([key, value]) => (
//                                             <Typography key={key} variant="body2">
//                                                 <strong>Button {key}:</strong> {value}
//                                             </Typography>
//                                         )
//                                     )}
//                                 </Box>
//                             )}
//                         </motion.div>
//                     )}
//                 </Stack>
//             </Box>
//         </motion.div>
//     );
// };

// export default AdminShowWebsiteButtonDetails

import { Box, Stack, Typography, LinearProgress, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const AdminShowWebsiteButtonDetails = ({ selectedWebsite }) => {
    if (!selectedWebsite) return null;

    const keyMapper = {
        1: "First Question - YES",
        2: "First Question - NO",
        3: "Second Question - YES",
        4: "Second Question - NO",
        5: "CALL BUTTON",
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%" }}
        >
            <Card
                sx={{
                    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                    color: "white",
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                    overflow: "hidden",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        component={motion.div}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
                    >
                        Selected Website Details
                    </Typography>
                    <Stack spacing={3}>
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Typography variant="body1" fontWeight="bold" gutterBottom>
                                Website ID: {selectedWebsite.websiteId}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Visited:</strong> {selectedWebsite.totalVisits.toLocaleString()}
                            </Typography>
                            {selectedWebsite.websiteName && (
                                <Typography variant="body1">
                                    <strong>Name:</strong> {selectedWebsite.websiteName}
                                </Typography>
                            )}

                            {/* Conversion Rate */}
                            <Box mt={3}>
                                <Typography variant="body1" fontWeight="bold" gutterBottom>
                                    Conversion Rate:
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <LinearProgress
                                        variant="determinate"
                                        // value={selectedWebsite.conversionPercentage || 0}
                                        value={60 || 0}
                                        sx={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                                    />
                                    <Typography variant="body2" sx={{ minWidth: 40 }}>
                                        {selectedWebsite.conversionPercentage || 0}%
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Button Clicks */}
                            {selectedWebsite.buttonClicks && (
                                <Box mt={4}>
                                    <Typography variant="body1" fontWeight="bold" gutterBottom>
                                        Button Clicks:
                                    </Typography>
                                    <Stack spacing={1}>
                                        {Object.entries(selectedWebsite.buttonClicks).map(([key, value], index) => (
                                            <motion.div
                                                key={key}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: 0.1 * key }}
                                            >
                                                <Typography variant="body2" sx={{ background: "rgba(255, 255, 255, 0.1)", padding: "6px 12px", borderRadius: "8px" }}>
                                                    <strong>{keyMapper[index + 1]} :</strong> {value.toLocaleString()}
                                                </Typography>
                                            </motion.div>
                                        ))}
                                    </Stack>
                                </Box>
                            )}
                        </motion.div>
                    </Stack>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default AdminShowWebsiteButtonDetails;
