import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';
import { StreamsPage } from '../pages/StreamsPage';
import { StreamDetailsPage } from '../pages/StreamDetailsPage';
import { ServersPage } from '../pages/ServersPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/streams" replace />} />
        
        <Route path="/streams" element={
          <Suspense fallback={<LoadingSpinner />}>
            <StreamsPage />
          </Suspense>
        } />
        
        <Route path="/streams/:streamName" element={
          <Suspense fallback={<LoadingSpinner />}>
            <StreamDetailsPage />
          </Suspense>
        } />
        
        <Route path="/servers" element={
          <Suspense fallback={<LoadingSpinner />}>
            <ServersPage />
          </Suspense>
        } />
        
        <Route path="/analytics" element={
          <Suspense fallback={<LoadingSpinner />}>
            <AnalyticsPage />
          </Suspense>
        } />
        
        <Route path="/settings" element={
          <Suspense fallback={<LoadingSpinner />}>
            <SettingsPage />
          </Suspense>
        } />
        
        <Route path="*" element={
          <Suspense fallback={<LoadingSpinner />}>
            <NotFoundPage />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}