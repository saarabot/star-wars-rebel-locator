import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feature, Map, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Icon, Style, Stroke } from 'ol/style';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import { getDistance } from 'ol/sphere';
import { boundingExtent } from 'ol/extent';
import { fromLonLat, toLonLat } from 'ol/proj';

import countriesUrl from '@/data/countries.json?url';
import iconUrl from '@/assets/BlackRedMountain.svg?url';
// redux setup
import type { RootState } from '@/store';
import { Rebel } from '@/types';
import { setRebels } from '@/features/rebelsSlice';
import { setLocation } from '@/features/locationSlice';

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [onClickLocation, setOnClickLocation] = useState<Coordinate | null>(
    null
  );

  const targets = useSelector((state: RootState) => state.rebels.rebels);
  const dispatch = useDispatch();

  useEffect(() => {
    if (onClickLocation) {
      const updatedTargets = targets.map((target: Rebel) => {
        const distance =
          getDistance(onClickLocation, [target.long, target.lat]) / 1000;
        return {
          ...target,
          distance: distance,
        };
        // update targets to have distance from on click location in kilometers
      });
      dispatch(setRebels(updatedTargets));
      dispatch(setLocation(onClickLocation));
    }
  }, [onClickLocation]);

  useEffect(() => {
    if (mapContainer.current && !mapRef.current) {
      mapRef.current = new Map({
        target: mapContainer.current,
        layers: [
          new VectorLayer({
            background: '#1a2b39',
            source: new VectorSource({
              url: countriesUrl,
              format: new GeoJSON(),
            }),
            style: new Style({
              stroke: new Stroke({
                color: 'yellow',
                width: 1,
              }),
            }),
          }),
        ],
        view: new View({
          center: fromLonLat([0, 25]),
          zoom: 3,
        }),
      });

      // Set onclick location on map
      const locationSource = new VectorSource();
      const locationLayer = new VectorLayer({
        source: locationSource,
      });

      mapRef.current.on('click', (event) => {
        locationSource.clear();

        const point = mapRef.current!.getCoordinateFromPixel(event.pixel);
        const p = toLonLat(point);
        setOnClickLocation(p);
        const coordinates = event.coordinate;

        const newMarker = new Feature({
          geometry: new Point(coordinates),
          icon: iconUrl,
        });

        locationSource.addFeature(newMarker);
      });
      mapRef.current.addLayer(locationLayer);
    }
  }, []);

  const markerStyle = new Style({
    image: new Icon({
      src: iconUrl,
      scale: 0.12,
    }),
  });

  useEffect(() => {
    if (targets.length > 0 && mapRef.current) {
      const markerSource = new VectorSource();
      const markerLayer = new VectorLayer({
        source: markerSource,
      });

      targets.forEach((target) => {
        const feature = new Feature({
          geometry: target.coordinates,
          info: target.id,
          icon: iconUrl,
        });
        feature.setStyle(markerStyle);
        markerSource.addFeature(feature);
      });
      mapRef.current.addLayer(markerLayer);

      // Zoom to fit all markers
      const extent = boundingExtent(
        markerSource.getFeatures().map((feature: Feature) => {
          const geometry = feature.getGeometry();
          return geometry ? (geometry as Point).getCoordinates() : [0, 0];
        })
      );
      mapRef.current
        .getView()
        .fit(extent, { duration: 1000, padding: [200, 50, 50, 50] });
    }
  }, [targets]);

  return (
    <div
      style={{
        height: '100%',
        minHeight: '200px',
        width: '100%',
        position: 'relative',
      }}
      className='mr-1'
    >
      <div
        ref={mapContainer}
        style={{ height: '500px' }}
        className='border-2 border-orange-500'
      ></div>
    </div>
  );
};

export default MapComponent;
